import { redis } from "@/lib/redis";
import Elysia from "elysia";

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const authMiddleware = new Elysia({
  name: "auth",
})
  .error({ AuthError })
  .onError(({ code, set }) => {
    if (code === "AuthError") {
      set.status = 401;
      return { error: "Unauthorized" };
    }
  })
  .derive({ as: "scoped" }, async ({ query, headers }) => {
    const roomId = query.roomId;

    // Get token from Authorization header (case-insensitive)
    const authHeader = headers["authorization"];
    if (!authHeader) {
      throw new AuthError("Missing authorization header");
    }

    // Parse Authorization header: "Bearer <token>" (case-insensitive)
    const parts = authHeader.trim().split(/\s+/);
    if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
      throw new AuthError("Invalid authorization format. Expected: Bearer <token>");
    }

    const token = parts[1];
    if (!token) {
      throw new AuthError("Missing token in authorization header");
    }

    if (!roomId) {
      throw new AuthError("Missing roomId");
    }

    // Check if room exists
    const roomExists = await redis.exists(`meta:${roomId}`);
    if (!roomExists) {
      throw new AuthError("Room does not exist");
    }

    // Get connected users and validate token
    const connected = await redis.hget<string[]>(`meta:${roomId}`, "connected");
    const connectedArray = Array.isArray(connected) ? connected : [];

    if (!connectedArray.includes(token)) {
      throw new AuthError("Invalid token");
    }

    return { auth: { roomId, token, connected: connectedArray } };
  });
