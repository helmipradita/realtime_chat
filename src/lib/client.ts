import { treaty } from "@elysiajs/eden";
import type { App } from "../app/api/[[...slugs]]/route";

// For client-side (browser), always use URL-based treaty with type only
// For server-side, we could use instance, but in Next.js client components always run in browser
const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

export const client = treaty<App>(baseUrl).api;
