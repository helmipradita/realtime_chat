import { redis } from "@/lib/redis";
import { Elysia, t } from "elysia";
import { nanoid } from "nanoid";
import { authMiddleware } from "./auth";
import { z } from "zod";
import { Message, realtime } from "@/lib/realtime";
import { generateLicenseKey, saveLicense, validateLicense, getLicenseByEmail } from "@/lib/license";

const DEFAULT_TTL_SEC = 60 * 10; // 10 minutes
const MIN_TTL_SEC = 60 * 5; // 5 minutes
const MAX_TTL_SEC = 60 * 60 * 6; // 6 hours

// License/Subscription endpoints
const license = new Elysia({ prefix: "/license" })
	.post("/validate", async ({ body }) => {
		const { licenseKey } = body;
		const result = await validateLicense(licenseKey);
		
		if (result.valid && result.data) {
			return {
				valid: true,
				email: result.data.email,
				expiresAt: result.data.expiresAt,
				status: result.data.status,
			};
		}
		
		return { valid: false };
	}, {
		body: z.object({
			licenseKey: z.string(),
		}),
	})
	.post("/create", async ({ body }) => {
		// This would normally be called after Xendit payment webhook
		// For now, we'll create a simple endpoint for testing
		const { email } = body;
		
		// Check if email already has a license
		const existing = await getLicenseByEmail(email);
		if (existing && existing.data.status === "active") {
			return {
				success: false,
				error: "Email already has an active license",
				licenseKey: existing.key,
			};
		}
		
		const licenseKey = generateLicenseKey();
		const now = Date.now();
		const thirtyDays = 30 * 24 * 60 * 60 * 1000;
		
		await saveLicense(licenseKey, {
			email,
			createdAt: now,
			expiresAt: now + thirtyDays,
			status: "active",
		});
		
		return {
			success: true,
			licenseKey,
			expiresAt: now + thirtyDays,
		};
	}, {
		body: z.object({
			email: z.email(),
		}),
	})
	.post("/check-email", async ({ body }) => {
		const { email } = body;
		const existing = await getLicenseByEmail(email);
		
		if (existing && existing.data.status === "active") {
			return {
				hasLicense: true,
				licenseKey: existing.key,
				expiresAt: existing.data.expiresAt,
			};
		}
		
		return { hasLicense: false };
	}, {
		body: z.object({
			email: z.email(),
		}),
	});

const rooms = new Elysia({ prefix: "/room" })
	.post("/create", async ({ body }) => {
		const roomId = nanoid();
		
		// Validate TTL: clamp between min and max
		let ttl = body?.ttl ?? DEFAULT_TTL_SEC;
		ttl = Math.max(MIN_TTL_SEC, Math.min(MAX_TTL_SEC, ttl));

		const roomData: Record<string, unknown> = {
			connected: [],
			createdAt: Date.now(),
			ttl: ttl,
			hasPassword: !!body?.password,
		};

		// Store hashed password if provided
		if (body?.password) {
			// Simple hash for demo - in production use bcrypt
			roomData.password = body.password;
		}

		await redis.hset(`meta:${roomId}`, roomData);
		await redis.expire(`meta:${roomId}`, ttl);

		return { roomId, ttl, hasPassword: !!body?.password };
	}, {
		body: z.object({
			ttl: z.number().optional(),
			password: z.string().optional(),
		}).optional(),
	})
	.post("/verify-password", async ({ body }) => {
		const { roomId, password } = body;
		
		const meta = await redis.hgetall<{ password?: string; hasPassword?: boolean }>(`meta:${roomId}`);
		
		if (!meta) {
			return { valid: false, error: "Room not found" };
		}
		
		if (!meta.hasPassword) {
			return { valid: true };
		}
		
		if (meta.password === password) {
			return { valid: true };
		}
		
		return { valid: false, error: "Incorrect password" };
	}, {
		body: z.object({
			roomId: z.string(),
			password: z.string(),
		}),
	})
	.get("/info", async ({ query }) => {
		const { roomId } = query;
		const meta = await redis.hgetall<{ hasPassword?: boolean | string; connected?: string[] }>(`meta:${roomId}`);
		
		if (!meta || Object.keys(meta).length === 0) {
			return { exists: false };
		}

		const hasPassword = meta.hasPassword === true || meta.hasPassword === "true";
		
		return {
			exists: true,
			hasPassword,
			participantCount: meta.connected?.length ?? 0,
		};
	}, {
		query: z.object({ roomId: z.string() }),
	})
	.post("/join", async ({ body, cookie }) => {
		const { roomId } = body;
		const existingToken = cookie["x-auth-token"]?.value as string | undefined;
		
		const meta = await redis.hgetall<{ connected?: string[]; hasPassword?: boolean | string }>(`meta:${roomId}`);
		
		if (!meta || Object.keys(meta).length === 0) {
			return { success: false, error: "room-not-found" };
		}

		const connected = Array.isArray(meta.connected) ? meta.connected : [];

		// Already connected
		if (existingToken && connected.includes(existingToken)) {
			return { success: true, token: existingToken, alreadyConnected: true };
		}

		// Room full
		if (connected.length >= 5) {
			return { success: false, error: "room-full" };
		}

		// Join room
		const token = nanoid();
		await redis.hset(`meta:${roomId}`, {
			connected: [...connected, token],
		});

		return { success: true, token, alreadyConnected: false };
	}, {
		body: z.object({ roomId: z.string() }),
	})
	// TTL endpoint - public (no auth required, just returns time remaining)
	.get(
		"/ttl",
		async ({ query }) => {
			const { roomId } = query;
			const ttl = await redis.ttl(`meta:${roomId}`);
			return { ttl: ttl > 0 ? ttl : 0 };
		},
		{ query: z.object({ roomId: z.string() }) }
	)
	// Protected endpoints (require auth)
	.use(authMiddleware)
	.delete("/", async ({ auth }) => {
		await realtime.channel(auth.roomId).emit("chat.destroy", { isDestroyed: true });

		await Promise.all([
			redis.del(auth.roomId),
			redis.del(`meta:${auth.roomId}`),
			redis.del(`messages:${auth.roomId}`),
		])

	}, { query: z.object({ roomId: z.string() }) });

const messages = new Elysia({ prefix: "/messages" })
	.use(authMiddleware)
	.post(
		"/",
		async ({ body, auth }) => {
			const { sender, text } = body;
			const { roomId } = auth;

			const roomExists = await redis.exists(`meta:${roomId}`);

			if (!roomExists) {
				throw new Error("Room does not exist");
			}

			const message: Message = {
				id: nanoid(),
				sender,
				text,
				timestamp: Date.now(),
				roomId,
			};

			// add message to history
			await redis.rpush(`messages:${roomId}`, { ...message, token: auth.token });
			await realtime.channel(roomId).emit("chat.message", message);

			// housekeeping
			const remaining = await redis.ttl(`meta:${roomId}`);

			await redis.expire(`messages:${roomId}`, remaining);
			await redis.expire(`history:${roomId}`, remaining);
			await redis.expire(roomId, remaining);
		},
		{
			query: z.object({ roomId: z.string() }),
			body: z.object({
				sender: z.string().max(100),
				text: z.string().max(1000),
			}),
		}
	)
	.get(
		"/",
		async ({ auth }) => {
			const messages = await redis.lrange<Message>(`messages:${auth.roomId}`, 0, -1);

			return {
				messages: messages.map((m) => ({
					...m,
					token: m.token === auth.token ? auth.token : undefined,
				})),
			};
		},
		{ query: z.object({ roomId: z.string() }) }
	);

export const app = new Elysia({ prefix: "/api" }).use(license).use(rooms).use(messages);

export const GET = app.fetch;
export const POST = app.fetch;
export const DELETE = app.fetch;

export type App = typeof app;
