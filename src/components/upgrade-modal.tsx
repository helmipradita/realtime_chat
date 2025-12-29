"use client";

import { useState } from "react";
import { QrCode, CreditCard, Smartphone, Mail, Key } from "lucide-react";
import { client } from "@/lib/client";

interface UpgradeModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: (licenseKey: string) => void;
}

type ModalView = "upgrade" | "activate" | "success";

export function UpgradeModal({ isOpen, onClose, onSuccess }: UpgradeModalProps) {
	const [view, setView] = useState<ModalView>("upgrade");
	const [email, setEmail] = useState("");
	const [licenseKey, setLicenseKey] = useState("");
	const [generatedKey, setGeneratedKey] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	if (!isOpen) return null;

	const handleUpgrade = async () => {
		if (!email) {
			setError("Email is required");
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			// For now, directly create license (later will integrate with Xendit)
			const res = await client.license.create.post({ email });

			if (res.status === 200 && res.data?.success) {
				setGeneratedKey(res.data.licenseKey!);
				setView("success");
				onSuccess?.(res.data.licenseKey!);
			} else if (res.data?.licenseKey) {
				// Already has license
				setGeneratedKey(res.data.licenseKey);
				setView("success");
				onSuccess?.(res.data.licenseKey);
			} else {
				setError(res.data?.error || "Failed to create license");
			}
		} catch (err) {
			setError("Something went wrong. Please try again.");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleActivate = async () => {
		if (!licenseKey) {
			setError("License key is required");
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			const res = await client.license.validate.post({ licenseKey });

			if (res.status === 200 && res.data?.valid) {
				setGeneratedKey(licenseKey);
				setView("success");
				onSuccess?.(licenseKey);
			} else {
				setError("Invalid or expired license key");
			}
		} catch (err) {
			setError("Something went wrong. Please try again.");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		setView("upgrade");
		setEmail("");
		setLicenseKey("");
		setGeneratedKey("");
		setError("");
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/80 backdrop-blur-sm"
				onClick={handleClose}
			/>

			{/* Modal */}
			<div className="relative bg-zinc-900 border border-green-500/30 p-6 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(34,197,94,0.15)]">
				{/* Close Button */}
				<button
					onClick={handleClose}
					className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
				>
					✕
				</button>

				{/* Header */}
				<div className="text-center mb-6">
					<p className="text-green-500 font-mono text-sm mb-2">
						{">"}private_chat_
					</p>
					<h2 className="font-mono text-xl text-white">
						{view === "success" ? "Pro Activated! 🎉" : "Upgrade to Pro 🚀"}
					</h2>
				</div>

				{/* Success View */}
				{view === "success" && (
					<div className="space-y-4">
						<div className="bg-green-500/10 border border-green-500/30 p-4 text-center">
							<p className="text-green-400 font-mono text-sm mb-2">
								Your License Key:
							</p>
							<p className="text-white font-mono text-lg font-bold select-all">
								{generatedKey}
							</p>
							<p className="text-zinc-500 font-mono text-xs mt-2">
								Save this key! You&apos;ll need it to activate on other devices.
							</p>
						</div>

						<button
							onClick={() => {
								navigator.clipboard.writeText(generatedKey);
							}}
							className="w-full py-2 border border-zinc-700 text-zinc-400 font-mono text-sm hover:bg-zinc-800 transition-colors"
						>
							📋 Copy License Key
						</button>

						<button
							onClick={handleClose}
							className="w-full py-3 bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors"
						>
							START USING PRO
						</button>
					</div>
				)}

				{/* Activate View */}
				{view === "activate" && (
					<div className="space-y-4">
						<p className="text-zinc-400 font-mono text-sm text-center">
							Enter the license key you received after purchase
						</p>

						<div>
							<label className="flex items-center gap-2 text-zinc-500 font-mono text-xs mb-2">
								<Key className="w-3.5 h-3.5" /> License Key
							</label>
							<input
								type="text"
								value={licenseKey}
								onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
								placeholder="PRIV-XXXX-XXXX-XXXX"
								className="w-full bg-zinc-950 border border-zinc-800 p-3 font-mono text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-green-500/50 focus:outline-none"
							/>
						</div>

						{error && (
							<p className="text-red-500 font-mono text-xs text-center">
								{error}
							</p>
						)}

						<button
							onClick={handleActivate}
							disabled={isLoading}
							className="w-full py-3 bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors disabled:opacity-50"
						>
							{isLoading ? "VALIDATING..." : "ACTIVATE LICENSE"}
						</button>

						<button
							onClick={() => {
								setView("upgrade");
								setError("");
							}}
							className="w-full py-2 text-zinc-500 font-mono text-sm hover:text-zinc-300 transition-colors"
						>
							← Back to Upgrade
						</button>
					</div>
				)}

				{/* Upgrade View */}
				{view === "upgrade" && (
					<>
						{/* Comparison Table */}
						<div className="mb-6">
							<table className="w-full font-mono text-sm">
								<thead>
									<tr className="border-b border-zinc-800">
										<th className="text-left py-2 text-zinc-500 font-normal">
											Feature
										</th>
										<th className="text-center py-2 text-zinc-500 font-normal">
											Free
										</th>
										<th className="text-center py-2 text-green-500 font-normal">
											Pro
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b border-zinc-800/50">
										<td className="py-3 text-zinc-300">Room duration</td>
										<td className="py-3 text-center text-zinc-400">10 min</td>
										<td className="py-3 text-center text-green-400">
											Up to 6 hours
										</td>
									</tr>
									<tr className="border-b border-zinc-800/50">
										<td className="py-3 text-zinc-300">Participants</td>
										<td className="py-3 text-center text-zinc-400">2</td>
										<td className="py-3 text-center text-green-400">5</td>
									</tr>
									<tr className="border-b border-zinc-800/50">
										<td className="py-3 text-zinc-300">Rooms/day</td>
										<td className="py-3 text-center text-zinc-400">3</td>
										<td className="py-3 text-center text-green-400">
											Unlimited
										</td>
									</tr>
									<tr className="border-b border-zinc-800/50">
										<td className="py-3 text-zinc-300">Password room</td>
										<td className="py-3 text-center text-red-500">✗</td>
										<td className="py-3 text-center text-green-500">✓</td>
									</tr>
									<tr>
										<td className="py-3 text-zinc-300">Custom name</td>
										<td className="py-3 text-center text-red-500">✗</td>
										<td className="py-3 text-center text-green-500">✓</td>
									</tr>
								</tbody>
							</table>
						</div>

						{/* Email Input */}
						<div className="mb-4">
							<label className="flex items-center gap-2 text-zinc-500 font-mono text-xs mb-2">
								<Mail className="w-3.5 h-3.5" /> Email (for receipt & recovery)
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="email@example.com"
								className="w-full bg-zinc-950 border border-zinc-800 p-3 font-mono text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-green-500/50 focus:outline-none"
							/>
							<p className="text-zinc-600 font-mono text-xs mt-1">
								* We won&apos;t spam you
							</p>
						</div>

						{error && (
							<p className="text-red-500 font-mono text-xs text-center mb-4">
								{error}
							</p>
						)}

						{/* Price */}
						<div className="text-center mb-4">
							<div className="font-mono">
								<span className="text-2xl text-white">$4.99</span>
								<span className="text-zinc-500 text-sm">/month</span>
							</div>
							<p className="text-zinc-600 text-xs font-mono mt-1">
								Cancel anytime
							</p>
						</div>

						{/* Payment Methods */}
						<div className="text-center mb-6">
							<p className="text-zinc-500 font-mono text-xs mb-2">
								Payment methods:
							</p>
							<div className="flex items-center justify-center gap-3 text-xs font-mono text-zinc-500">
								<span className="flex items-center gap-1">
									<QrCode className="w-3.5 h-3.5" /> QRIS
								</span>
								<span className="flex items-center gap-1">
									<CreditCard className="w-3.5 h-3.5" /> Visa / Mastercard
								</span>
								<span className="flex items-center gap-1">
									<Smartphone className="w-3.5 h-3.5" /> E-wallet
								</span>
							</div>
						</div>

						{/* Buttons */}
						<div className="space-y-3">
							<button
								onClick={handleUpgrade}
								disabled={isLoading}
								className="w-full py-3 bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors disabled:opacity-50"
							>
								{isLoading ? "PROCESSING..." : "PAY NOW"}
							</button>

							<div className="flex items-center gap-2">
								<div className="flex-1 h-px bg-zinc-800" />
								<span className="text-zinc-600 font-mono text-xs">or</span>
								<div className="flex-1 h-px bg-zinc-800" />
							</div>

							<button
								onClick={() => setView("activate")}
								className="w-full py-2 border border-zinc-700 text-zinc-400 font-mono text-sm hover:bg-zinc-800 transition-colors"
							>
								Have a License Key?
							</button>

							<button
								onClick={handleClose}
								className="w-full py-2 text-zinc-500 font-mono text-sm hover:text-zinc-300 transition-colors"
							>
								Maybe later
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
