"use client";

import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/client";
import { UpgradeModal } from "@/components/upgrade-modal";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { MessageSquare, CreditCard, Clock, Shield, Users, Zap } from "lucide-react";

const TTL_OPTIONS = [
	{ label: "10 menit", value: 10 * 60, tier: "free" },
	{ label: "30 menit", value: 30 * 60, tier: "pro" },
	{ label: "1 jam", value: 60 * 60, tier: "pro" },
	{ label: "6 jam", value: 6 * 60 * 60, tier: "pro" },
] as const;

const Page = () => {
	return (
		<Suspense>
			<Lobby />
		</Suspense>
	);
};

function Lobby() {
	const { username } = useUsername();
	const router = useRouter();
	const [selectedTTL, setSelectedTTL] = useState(TTL_OPTIONS[0].value);
	const [showUpgradeModal, setShowUpgradeModal] = useState(false);
	const [passwordEnabled, setPasswordEnabled] = useState(false);

	// TODO: Get from auth/subscription system
	const [userPlan] = useState<"free" | "pro">("free");

	const searchParams = useSearchParams();
	const wasDestroyed = searchParams.get("destroyed") === "true";
	const error = searchParams.get("error");

	const { mutate: createRoom, isPending } = useMutation({
		mutationFn: async () => {
			const res = await client.room.create.post({ ttl: selectedTTL });

			if (res.status === 200) {
				router.push(`/room/${res.data?.roomId}`);
			}

			return res;
		},
		onError: (error) => {
			console.error("Failed to create room:", error);
		},
	});

	const handleTTLSelect = (option: (typeof TTL_OPTIONS)[number]) => {
		if (option.tier === "pro" && userPlan === "free") {
			setShowUpgradeModal(true);
			return;
		}
		setSelectedTTL(option.value);
	};

	const handlePasswordToggle = () => {
		if (userPlan === "free") {
			setShowUpgradeModal(true);
			return;
		}
		setPasswordEnabled(!passwordEnabled);
	};

	return (
		<main className="min-h-screen bg-zinc-950 flex flex-col">
			{/* Header */}
			<nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
				<div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
					<Link href="/" className="text-green-500 font-mono font-bold">
						{">"}_private_chat
					</Link>
					<div className="flex items-center gap-6">
						<Link
							href="/"
							className="text-green-500 text-sm font-mono flex items-center gap-2"
						>
							<MessageSquare className="w-4 h-4" /> ROOM
						</Link>
						<Link
							href="/pricing"
							className="text-zinc-400 hover:text-zinc-200 text-sm font-mono flex items-center gap-2"
						>
							<CreditCard className="w-4 h-4" /> PRICING
						</Link>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<div className="flex-1 flex flex-col items-center justify-center p-4 pt-20">
				<div className="w-full max-w-md">
					{/* Error Messages */}
					{wasDestroyed && (
						<div className="bg-red-950/50 border border-red-900 p-4 text-center mb-6">
							<p className="text-red-500 text-sm font-bold font-mono">
								ROOM DESTROYED
							</p>
							<p className="text-zinc-500 text-xs mt-1 font-mono">
								All messages were permanently deleted.
							</p>
						</div>
					)}
					{error === "room-not-found" && (
						<div className="bg-red-950/50 border border-red-900 p-4 text-center mb-6">
							<p className="text-red-500 text-sm font-bold font-mono">
								ROOM NOT FOUND
							</p>
							<p className="text-zinc-500 text-xs mt-1 font-mono">
								This room may have expired or never existed.
							</p>
						</div>
					)}
					{error === "room-full" && (
						<div className="bg-red-950/50 border border-red-900 p-4 text-center mb-6">
							<p className="text-red-500 text-sm font-bold font-mono">
								ROOM FULL
							</p>
							<p className="text-zinc-500 text-xs mt-1 font-mono">
								This room is at maximum capacity.
							</p>
						</div>
					)}

					{/* Title */}
					<div className="text-center mb-8">
						<h1 className="text-3xl font-mono font-bold text-green-500 mb-2">
							{">"}private chat<span className="animate-pulse">_</span>
						</h1>
						<p className="text-zinc-500 text-sm font-mono">
							A private, self-destructing chat room.
						</p>
					</div>

					{/* Create Room Form */}
					<div className="border border-zinc-800 bg-zinc-900/50 p-6">
						{/* Plan Indicator */}
						<div className="flex items-center justify-between mb-6">
							<span className="text-zinc-500 font-mono text-sm">Plan:</span>
							<div className="flex items-center gap-2">
								<span className="text-white font-mono text-sm">
									{userPlan === "pro" ? "Pro ✓" : "Free"}
								</span>
								{userPlan === "free" && (
									<Link
										href="/pricing"
										className="text-green-500 font-mono text-sm hover:underline"
									>
										Upgrade
									</Link>
								)}
							</div>
						</div>

						{/* TTL Selector */}
						<div className="mb-6">
							<label className="flex items-center gap-2 text-zinc-500 font-mono text-sm mb-3">
								<Clock className="w-4 h-4" /> Room Duration (TTL)
							</label>
							<div className="grid grid-cols-2 gap-2">
								{TTL_OPTIONS.map((option) => {
									const isLocked = option.tier === "pro" && userPlan === "free";
									const isSelected = selectedTTL === option.value;

									return (
										<button
											key={option.value}
											type="button"
											onClick={() => handleTTLSelect(option)}
											className={`
												relative p-3 font-mono text-sm border transition-all cursor-pointer
												${
													isSelected && !isLocked
														? "bg-green-500/20 border-green-500 text-green-400"
														: "bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700"
												}
											`}
										>
											{option.label}
											{isLocked && (
												<span className="absolute top-1 right-1 bg-green-500/20 text-green-500 text-[10px] px-1.5 py-0.5 rounded font-bold">
													PRO
												</span>
											)}
										</button>
									);
								})}
							</div>
						</div>

						{/* Password Protection */}
						<div className="mb-6">
							<div className="flex items-center justify-between">
								<label className="flex items-center gap-2 text-zinc-500 font-mono text-sm">
									<Shield className="w-4 h-4" /> Password Protection
									{userPlan === "free" && (
										<span className="bg-green-500/20 text-green-500 text-[10px] px-1.5 py-0.5 rounded font-bold">
											PRO
										</span>
									)}
								</label>
								<button
									onClick={handlePasswordToggle}
									className={`
										w-11 h-6 rounded-full transition-colors relative
										${passwordEnabled ? "bg-green-500" : "bg-zinc-700"}
									`}
								>
									<span
										className={`
											absolute top-1 w-4 h-4 bg-zinc-400 rounded-full transition-transform duration-200
											${passwordEnabled ? "left-6" : "left-1"}
										`}
									/>
								</button>
							</div>
							{passwordEnabled && userPlan === "pro" && (
								<input
									type="password"
									placeholder="Masukkan password room"
									className="w-full mt-3 bg-zinc-950 border border-zinc-800 p-3 font-mono text-sm text-zinc-400 placeholder:text-zinc-600"
								/>
							)}
						</div>

						{/* Username */}
						<div className="mb-6">
							<label className="flex items-center gap-2 text-zinc-500 font-mono text-sm mb-3">
								<Users className="w-4 h-4" /> Your Identity
							</label>
							<input
								type="text"
								value={username}
								disabled={userPlan === "free"}
								placeholder={userPlan === "pro" ? "Masukkan nama kamu" : ""}
								className="w-full bg-zinc-950 border border-zinc-800 p-3 font-mono text-sm text-zinc-400 placeholder:text-zinc-600 disabled:cursor-not-allowed"
							/>
						</div>

						{/* Create Button */}
						<button
							onClick={() => createRoom()}
							disabled={isPending}
							className="w-full py-3 bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isPending ? "CREATING..." : "CREATE SECURE ROOM"}
						</button>

						{/* Info */}
						<p className="text-center text-zinc-600 font-mono text-xs mt-4">
							Max 2 peserta per room • 3 rooms per hari
						</p>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="border-t border-zinc-800 py-12">
				<div className="max-w-4xl mx-auto px-4">
					<div className="grid md:grid-cols-3 gap-8 text-center">
						<div>
							<div className="w-12 h-12 mx-auto mb-4 rounded-full border border-green-500/30 flex items-center justify-center">
								<Shield className="w-6 h-6 text-green-500" />
							</div>
							<h3 className="font-mono text-white mb-2">End-to-End Encrypted</h3>
							<p className="font-mono text-zinc-500 text-sm">
								Pesan dienkripsi dan tidak bisa dibaca siapapun.
							</p>
						</div>
						<div>
							<div className="w-12 h-12 mx-auto mb-4 rounded-full border border-green-500/30 flex items-center justify-center">
								<Clock className="w-6 h-6 text-green-500" />
							</div>
							<h3 className="font-mono text-white mb-2">Self-Destructing</h3>
							<p className="font-mono text-zinc-500 text-sm">
								Room otomatis terhapus setelah TTL berakhir.
							</p>
						</div>
						<div>
							<div className="w-12 h-12 mx-auto mb-4 rounded-full border border-green-500/30 flex items-center justify-center">
								<Zap className="w-6 h-6 text-green-500" />
							</div>
							<h3 className="font-mono text-white mb-2">Real-time</h3>
							<p className="font-mono text-zinc-500 text-sm">
								Pesan terkirim secara instan tanpa delay.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Upgrade Modal */}
			<UpgradeModal
				isOpen={showUpgradeModal}
				onClose={() => setShowUpgradeModal(false)}
			/>
		</main>
	);
}

export default Page;
