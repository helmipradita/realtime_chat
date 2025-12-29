"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/client";

const LICENSE_STORAGE_KEY = "private_chat_license";

interface LicenseState {
	isPro: boolean;
	licenseKey: string | null;
	email: string | null;
	expiresAt: number | null;
	isLoading: boolean;
}

export function useLicense() {
	const [state, setState] = useState<LicenseState>({
		isPro: false,
		licenseKey: null,
		email: null,
		expiresAt: null,
		isLoading: true,
	});

	// Load and validate license on mount
	useEffect(() => {
		const validateStoredLicense = async () => {
			const storedKey = localStorage.getItem(LICENSE_STORAGE_KEY);
			
			if (!storedKey) {
				setState(prev => ({ ...prev, isLoading: false }));
				return;
			}

			try {
				const res = await client.license.validate.post({ licenseKey: storedKey });
				
				if (res.status === 200 && res.data?.valid) {
					setState({
						isPro: true,
						licenseKey: storedKey,
						email: res.data.email ?? null,
						expiresAt: res.data.expiresAt ?? null,
						isLoading: false,
					});
				} else {
					// Invalid license, clear it
					localStorage.removeItem(LICENSE_STORAGE_KEY);
					setState({
						isPro: false,
						licenseKey: null,
						email: null,
						expiresAt: null,
						isLoading: false,
					});
				}
			} catch (error) {
				console.error("Failed to validate license:", error);
				setState(prev => ({ ...prev, isLoading: false }));
			}
		};

		validateStoredLicense();
	}, []);

	// Activate license
	const activateLicense = async (licenseKey: string): Promise<{ success: boolean; error?: string }> => {
		try {
			const res = await client.license.validate.post({ licenseKey });
			
			if (res.status === 200 && res.data?.valid) {
				localStorage.setItem(LICENSE_STORAGE_KEY, licenseKey);
				setState({
					isPro: true,
					licenseKey,
					email: res.data.email ?? null,
					expiresAt: res.data.expiresAt ?? null,
					isLoading: false,
				});
				return { success: true };
			} else {
				return { success: false, error: "License key tidak valid" };
			}
		} catch (error) {
			console.error("Failed to activate license:", error);
			return { success: false, error: "Gagal memvalidasi license" };
		}
	};

	// Deactivate/logout
	const deactivateLicense = () => {
		localStorage.removeItem(LICENSE_STORAGE_KEY);
		setState({
			isPro: false,
			licenseKey: null,
			email: null,
			expiresAt: null,
			isLoading: false,
		});
	};

	return {
		...state,
		activateLicense,
		deactivateLicense,
	};
}
