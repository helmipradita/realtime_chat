import { redis } from "@/lib/redis";
import { Elysia, t } from "elysia";
import { nanoid } from "nanoid";
import { authMiddleware } from "./auth";
import { z } from "zod";
import { Message, realtime } from "@/lib/realtime";

const DEFAULT_TTL_SEC = 60 * 10; // 10 minutes
const MIN_TTL_SEC = 60 * 5; // 5 minutes
const MAX_TTL_SEC = 60 * 60 * 6; // 6 hours

const rooms = new Elysia({ prefix: "/room" })
	.post("/create", async ({ body }) => {
		const roomId = nanoid();
		
		// Validate TTL: clamp between min and max
		let ttl = body?.ttl ?? DEFAULT_TTL_SEC;
		ttl = Math.max(MIN_TTL_SEC, Math.min(MAX_TTL_SEC, ttl));

		await redis.hset(`meta:${roomId}`, {
			connected: [],
			createdAt: Date.now(),
			ttl: ttl,
		});

		await redis.expire(`meta:${roomId}`, ttl);

		return { roomId, ttl };
	}, {
		body: z.object({
			ttl: z.number().optional(),
		}).optional(),
	})
	.use(authMiddleware)
	.get(
		"/ttl",
		async ({ auth }) => {
			const ttl = await redis.ttl(`meta:${auth.roomId}`);
			return { ttl: ttl > 0 ? ttl : 0 };
		},
		{ query: z.object({ roomId: z.string() }) }
	)
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

export const app = new Elysia({ prefix: "/api" }).use(rooms).use(messages);

export const GET = app.fetch;
export const POST = app.fetch;
export const DELETE = app.fetch;

export type App = typeof app;
