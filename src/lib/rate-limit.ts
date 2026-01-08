import { redis } from "./redis";

interface RateLimitResult {
	allowed: boolean;
	remaining: number;
	resetTime?: number;
}

/**
 * Simple rate limiter using Redis
 * @param identifier Unique identifier (IP, userId, etc.)
 * @param limit Maximum number of requests
 * @param window Time window in seconds
 * @returns Rate limit result
 */
export async function rateLimit(
	identifier: string,
	limit: number = 10,
	window: number = 60
): Promise<RateLimitResult> {
	const key = `ratelimit:${identifier}`;

	try {
		// Increment counter
		const current = await redis.incr(key);

		// Set expiration on first request
		if (current === 1) {
			await redis.expire(key, window);
		}

		const allowed = current <= limit;
		const remaining = Math.max(0, limit - current);

		// Get TTL for reset time
		if (!allowed) {
			const ttl = await redis.ttl(key);
			const resetTime = Date.now() + ttl * 1000;
			return { allowed, remaining: 0, resetTime };
		}

		return { allowed, remaining };
	} catch (error) {
		console.error("Rate limit error:", error);
		// Fail open - allow request if rate limiting fails
		return { allowed: true, remaining: limit };
	}
}

/**
 * Rate limit middleware for Elysia routes
 */
export async function checkRateLimit(
	headers: { "x-forwarded-for"?: string; "x-real-ip"?: string },
	limit: number = 10,
	window: number = 60
): Promise<RateLimitResult> {
	// Get IP from headers
	const ip = headers["x-forwarded-for"]?.split(",")[0].trim() || headers["x-real-ip"] || "unknown";
	return rateLimit(ip, limit, window);
}
