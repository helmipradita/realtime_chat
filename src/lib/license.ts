import { nanoid } from "nanoid";
import { redis } from "./redis";

// License key format: PRIV-XXXX-XXXX-XXXX
export function generateLicenseKey(): string {
	const parts = [
		"PRIV",
		nanoid(4).toUpperCase(),
		nanoid(4).toUpperCase(),
		nanoid(4).toUpperCase(),
	];
	return parts.join("-");
}

export interface LicenseData {
	email: string;
	createdAt: number;
	expiresAt: number; // timestamp
	status: "active" | "expired" | "cancelled";
}

// Save license to Redis
export async function saveLicense(licenseKey: string, data: LicenseData): Promise<void> {
	await redis.hset(`license:${licenseKey}`, data);
	// Also index by email for lookup
	await redis.set(`license:email:${data.email}`, licenseKey);
}

// Get license by key
export async function getLicense(licenseKey: string): Promise<LicenseData | null> {
	const data = await redis.hgetall<LicenseData>(`license:${licenseKey}`);
	if (!data || Object.keys(data).length === 0) return null;
	return data;
}

// Get license by email
export async function getLicenseByEmail(email: string): Promise<{ key: string; data: LicenseData } | null> {
	const licenseKey = await redis.get<string>(`license:email:${email}`);
	if (!licenseKey) return null;
	
	const data = await getLicense(licenseKey);
	if (!data) return null;
	
	return { key: licenseKey, data };
}

// Validate license - check if active and not expired
export async function validateLicense(licenseKey: string): Promise<{ valid: boolean; data?: LicenseData }> {
	const data = await getLicense(licenseKey);
	
	if (!data) {
		return { valid: false };
	}
	
	const now = Date.now();
	const isExpired = data.expiresAt < now;
	const isActive = data.status === "active";
	
	return {
		valid: isActive && !isExpired,
		data,
	};
}

// Extend license (for renewal)
export async function extendLicense(licenseKey: string, daysToAdd: number = 30): Promise<boolean> {
	const data = await getLicense(licenseKey);
	if (!data) return false;
	
	const newExpiresAt = Math.max(data.expiresAt, Date.now()) + (daysToAdd * 24 * 60 * 60 * 1000);
	
	await redis.hset(`license:${licenseKey}`, {
		...data,
		expiresAt: newExpiresAt,
		status: "active",
	});
	
	return true;
}
