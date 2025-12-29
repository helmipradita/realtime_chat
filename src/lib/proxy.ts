import { redis } from "./redis";
import { nanoid } from "nanoid";

interface RoomMeta {
  connected: string[];
  createdAt: number;
  hasPassword?: boolean | string | number;
  password?: string;
  ttl?: number;
  [key: string]: unknown;
}

export interface RoomCheckResult {
  exists: boolean;
  hasPassword: boolean;
  needsPassword: boolean;
  isFull: boolean;
  isConnected: boolean;
  error?: string;
}

export async function checkRoom(roomId: string, token?: string): Promise<RoomCheckResult> {
  try {
    const meta = await redis.hgetall<RoomMeta>(`meta:${roomId}`);

    if (!meta || Object.keys(meta).length === 0) {
      return { exists: false, hasPassword: false, needsPassword: false, isFull: false, isConnected: false, error: "room-not-found" };
    }

    const connected = Array.isArray(meta.connected) ? meta.connected : [];
    const isConnected = token ? connected.includes(token) : false;
    const isFull = connected.length >= 5;
    
    const hasPassword =
      meta.hasPassword === true ||
      meta.hasPassword === "true" ||
      meta.hasPassword === 1 ||
      meta.hasPassword === "1";

    return {
      exists: true,
      hasPassword,
      needsPassword: hasPassword,
      isFull: !isConnected && isFull,
      isConnected,
    };
  } catch (error) {
    console.error("Redis error:", error);
    return { exists: false, hasPassword: false, needsPassword: false, isFull: false, isConnected: false, error: "server-error" };
  }
}

export async function joinRoom(roomId: string, existingToken?: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const meta = await redis.hgetall<RoomMeta>(`meta:${roomId}`);

    if (!meta || Object.keys(meta).length === 0) {
      return { success: false, error: "room-not-found" };
    }

    const connected = Array.isArray(meta.connected) ? meta.connected : [];

    // Already connected
    if (existingToken && connected.includes(existingToken)) {
      return { success: true, token: existingToken };
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

    return { success: true, token };
  } catch (error) {
    console.error("Redis error:", error);
    return { success: false, error: "server-error" };
  }
}
