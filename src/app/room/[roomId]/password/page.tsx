"use client";

import { client } from "@/lib/client";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PasswordPage() {
	const params = useParams();
	const router = useRouter();
	const roomId = params.roomId as string;

	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!password) {
			setError("Password is required");
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			const res = await client.room["verify-password"].post({
				roomId,
				password,
			});

			if (res.status === 200 && res.data?.valid) {
				// Set cookie to mark password as verified
				document.cookie = `room-verified-${roomId}=true; path=/; max-age=86400; samesite=strict`;
				
				// Redirect to room
				router.push(`/room/${roomId}`);
			} else {
				setError(res.data?.error || "Incorrect password");
			}
		} catch (err) {
			setError("Something went wrong. Please try again.");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="min-h-screen bg-zinc-950 flex flex-col">
			{/* Header */}
			<nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
				<div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
					<Link href="/" className="text-green-500 font-mono font-bold">
						{">"}_private_chat
					</Link>
				</div>
			</nav>

			{/* Main Content */}
			<div className="flex-1 flex flex-col items-center justify-center p-4">
				<div className="w-full max-w-sm">
					{/* Icon */}
					<div className="flex justify-center mb-6">
						<div className="w-16 h-16 rounded-full border border-green-500/30 flex items-center justify-center">
							<Shield className="w-8 h-8 text-green-500" />
						</div>
					</div>

					{/* Title */}
					<div className="text-center mb-8">
						<h1 className="text-xl font-mono font-bold text-white mb-2">
							Room Protected
						</h1>
						<p className="text-zinc-500 text-sm font-mono">
							This room is password protected.
							<br />
							Enter the password to join.
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="border border-zinc-800 bg-zinc-900/50 p-6">
							<div className="mb-4">
								<label className="flex items-center gap-2 text-zinc-500 font-mono text-sm mb-2">
									<Lock className="w-4 h-4" /> Password
								</label>
								<div className="relative">
									<input
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Enter room password"
										autoFocus
										className="w-full bg-zinc-950 border border-zinc-800 p-3 pr-10 font-mono text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-green-500/50 focus:outline-none"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
									>
										{showPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>
							</div>

							{error && (
								<p className="text-red-500 font-mono text-xs text-center mb-4">
									{error}
								</p>
							)}

							<button
								type="submit"
								disabled={isLoading}
								className="w-full py-3 bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors disabled:opacity-50"
							>
								{isLoading ? "VERIFYING..." : "JOIN ROOM"}
							</button>
						</div>

						<div className="text-center">
							<Link
								href="/"
								className="text-zinc-500 font-mono text-sm hover:text-zinc-300 transition-colors"
							>
								← Back to Home
							</Link>
						</div>
					</form>

					{/* Room ID */}
					<div className="mt-8 text-center">
						<p className="text-zinc-600 font-mono text-xs">
							Room ID: <span className="text-zinc-400">{roomId}</span>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
