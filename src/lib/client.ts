import { treaty } from "@elysiajs/eden";
import type { App } from "../app/api/[[...slugs]]/route";

const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

// Get auth token from localStorage
function getAuthToken(): string | null {
	if (typeof window === "undefined") return null;
	return localStorage.getItem("x-auth-token");
}

export const client = treaty<App>(baseUrl, {
	headers: () => {
		const token = getAuthToken();
		if (token) {
			return { Authorization: `Bearer ${token}` } as const;
		}
		return {} as Record<string, string>;
	},
}).api;
