import { nanoid } from "nanoid";
import { redis } from "./redis";

// License key format: PRIV-XXXX-XXXX-XXXX (16 chars total, 4 groups of 4)
const LICENSE_PREFIX = "PRIV";
const GROUP_SIZE = 4;
const NUM_GROUPS = 4;

export function generateLicenseKey(): string {
	const parts = [
		LICENSE_PREFIX,
		nanoid(GROUP_SIZE).toUpperCase(),
		nanoid(GROUP_SIZE).toUpperCase(),
		nanoid(GROUP_SIZE).toUpperCase(),
	];
	return parts.join("-");
}

// Format a raw key string into proper format with dashes
export function formatLicenseKey(raw: string): string {
	const cleaned = raw.replace(/[^A-Z0-9]/gi, "").toUpperCase();
	const groups: string[] = [];
	
	for (let i = 0; i < cleaned.length && groups.length < NUM_GROUPS; i += GROUP_SIZE) {
		groups.push(cleaned.slice(i, i + GROUP_SIZE));
	}
	
	return groups.join("-");
}

// Validate license key format
export function isValidLicenseFormat(key: string): boolean {
	// Remove dashes and check
	const cleaned = key.replace(/-/g, "");
	
	// Must be exactly 16 characters
	if (cleaned.length !== LICENSE_PREFIX.length + (GROUP_SIZE * (NUM_GROUPS - 1))) {
		return false;
	}
	
	// Must start with PRIV
	if (!cleaned.toUpperCase().startsWith(LICENSE_PREFIX)) {
		return false;
	}
	
	// Must be alphanumeric only
	if (!/^[A-Z0-9]+$/i.test(cleaned)) {
		return false;
	}
	
	return true;
}

// Normalize license key (ensure proper format with dashes)
export function normalizeLicenseKey(key: string): string {
	const cleaned = key.replace(/[^A-Z0-9]/gi, "").toUpperCase();
	return formatLicenseKey(cleaned);
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
