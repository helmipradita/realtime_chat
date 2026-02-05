import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MessageSquare, Lock, Clock, CreditCard, CheckCircle, Users } from "lucide-react";
import Image from "next/image";

export default function HowItWorksPage() {
	return (
		<main className="min-h-screen bg-zinc-950">
			<Navbar />

			<div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl font-mono font-bold mb-4">
						How <span className="text-green-500">It Works</span>
					</h1>
					<p className="text-zinc-400 font-mono text-lg">
						Simple, secure, and self-destructing chat in 3 easy steps
					</p>
				</div>

				{/* Step by Step */}
				<div className="space-y-16 mb-20">
					{/* Step 1 */}
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 rounded-full bg-green-500 text-black font-mono font-bold flex items-center justify-center">
									1
								</div>
								<h2 className="text-2xl font-mono text-white">Create a Room</h2>
							</div>
							<p className="text-zinc-400 font-mono text-sm leading-relaxed mb-4">
								Choose your room settings: duration (10 min to 6 hours), password protection (Pro), 
								and custom username (Pro). Click "Create Secure Room" and you're ready!
							</p>
							<div className="space-y-2">
								<div className="flex items-center gap-2 text-zinc-300 font-mono text-sm">
									<Clock className="w-4 h-4 text-green-500" />
									<span>Set TTL (Time To Live)</span>
								</div>
								<div className="flex items-center gap-2 text-zinc-300 font-mono text-sm">
									<Lock className="w-4 h-4 text-green-500" />
									<span>Optional password protection</span>
								</div>
								<div className="flex items-center gap-2 text-zinc-300 font-mono text-sm">
									<Users className="w-4 h-4 text-green-500" />
									<span>Up to 5 participants (Pro)</span>
								</div>
							</div>
						</div>
						<div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded">
							<div className="bg-zinc-950 p-4 border border-zinc-800">
								<div className="text-zinc-500 font-mono text-xs mb-2">Room Settings</div>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-zinc-400 font-mono text-sm">Duration</span>
										<span className="text-green-500 font-mono text-sm">10 min</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-zinc-400 font-mono text-sm">Password</span>
										<span className="text-zinc-600 font-mono text-sm">OFF</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-zinc-400 font-mono text-sm">Participants</span>
										<span className="text-zinc-400 font-mono text-sm">2</span>
									</div>
								</div>
								<button className="w-full mt-4 py-2 bg-green-500 text-black font-mono text-sm font-bold">
									CREATE SECURE ROOM
								</button>
							</div>
						</div>
					</div>

					{/* Step 2 */}
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div className="order-2 md:order-1">
							<div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded">
								<div className="bg-zinc-950 p-4 border border-zinc-800">
									<div className="flex items-center justify-between mb-4">
										<div>
											<div className="text-zinc-500 font-mono text-xs">Room ID</div>
											<div className="text-green-500 font-mono text-sm font-bold">abc123xyz</div>
										</div>
										<button className="text-xs bg-zinc-800 px-2 py-1 text-zinc-400 font-mono">
											COPY
										</button>
									</div>
									<div className="text-zinc-500 font-mono text-xs mb-2">Share this link:</div>
									<div className="bg-zinc-900 p-2 border border-zinc-800 text-green-500 font-mono text-xs break-all">
										https://privatechat.app/room/abc123xyz
									</div>
								</div>
							</div>
						</div>
						<div className="order-1 md:order-2">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 rounded-full bg-green-500 text-black font-mono font-bold flex items-center justify-center">
									2
								</div>
								<h2 className="text-2xl font-mono text-white">Share the Link</h2>
							</div>
							<p className="text-zinc-400 font-mono text-sm leading-relaxed mb-4">
								Copy the room link and share it with your contacts via WhatsApp, Telegram, email, 
								or any messaging app. Only people with the link can join.
							</p>
							<div className="space-y-2">
								<div className="flex items-center gap-2 text-zinc-300 font-mono text-sm">
									<CheckCircle className="w-4 h-4 text-green-500" />
									<span>Unique room ID generated</span>
								</div>
								<div className="flex items-center gap-2 text-zinc-300 font-mono text-sm">
									<CheckCircle className="w-4 h-4 text-green-500" />
									<span>One-click copy to clipboard</span>
								</div>
								<div className="flex items-center gap-2 text-zinc-300 font-mono text-sm">
									<CheckCircle className="w-4 h-4 text-green-500" />
									<span>Share anywhere you want</span>
								</div>
							</div>
						</div>
					</div>

					{/* Step 3 */}
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 rounded-full bg-green-500 text-black font-mono font-bold flex items-center justify-center">
									3
								</div>
								<h2 className="text-2xl font-mono text-white">Chat Securely</h2>
							</div>
							<p className="text-zinc-400 font-mono text-sm leading-relaxed mb-4">
								Start chatting! All messages are real-time and will automatically delete when the 
								room expires. No history, no traces, complete privacy.
							</p>
							<div className="space-y-2">
								<div className="flex items-center gap-2 text-zinc-300 font-mono text-sm">
									<MessageSquare className="w-4 h-4 text-green-500" />
									<span>Real-time messaging</span>
								</div>
								<div className="flex items-center gap-2 text-zinc-300 font-mono text-sm">
									<Clock className="w-4 h-4 text-green-500" />
									<span>Auto-delete after TTL</span>
								</div>
								<div className="flex items-center gap-2 text-zinc-300 font-mono text-sm">
									<Lock className="w-4 h-4 text-green-500" />
									<span>No permanent storage</span>
								</div>
							</div>
						</div>
						<div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded">
							<div className="bg-zinc-950 p-4 border border-zinc-800">
								<div className="space-y-3 mb-4">
									<div className="bg-zinc-900 p-2 border-l-2 border-green-500">
										<div className="text-green-500 font-mono text-xs font-bold mb-1">YOU</div>
										<div className="text-zinc-300 font-mono text-sm">Hello! 👋</div>
									</div>
									<div className="bg-zinc-900 p-2 border-l-2 border-blue-500">
										<div className="text-blue-500 font-mono text-xs font-bold mb-1">USER_ABC</div>
										<div className="text-zinc-300 font-mono text-sm">Hi there!</div>
									</div>
								</div>
								<div className="flex gap-2">
									<input
										type="text"
										placeholder="Type message..."
										className="flex-1 bg-zinc-900 border border-zinc-800 p-2 text-zinc-300 font-mono text-sm"
										disabled
									/>
									<button className="bg-zinc-800 text-zinc-400 px-4 font-mono text-sm">
										SEND
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Upgrade to Pro Section */}
				<div className="bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/30 p-8 rounded mb-16">
					<div className="text-center mb-6">
						<h2 className="text-2xl font-mono text-white mb-3">
							Want More Features?
						</h2>
						<p className="text-zinc-400 font-mono text-sm">
							Upgrade to Pro for extended duration, password protection, and more
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-6 mb-6">
						<div className="bg-zinc-900/50 border border-zinc-800 p-4">
							<h3 className="text-white font-mono text-sm mb-3">Free Plan</h3>
							<ul className="space-y-2 text-zinc-400 font-mono text-xs">
								<li>✓ 10 minute rooms</li>
								<li>✓ 2 participants</li>
								<li>✓ 3 rooms per day</li>
								<li className="text-zinc-600">✗ No password protection</li>
							</ul>
						</div>
						<div className="bg-green-500/10 border border-green-500/30 p-4">
							<div className="flex items-center justify-between mb-3">
								<h3 className="text-green-500 font-mono text-sm">Pro Plan</h3>
								<span className="text-white font-mono text-lg font-bold">Rp 75.000/mo</span>
							</div>
							<ul className="space-y-2 text-zinc-300 font-mono text-xs">
								<li>✓ Up to 6 hour rooms</li>
								<li>✓ 5 participants</li>
								<li>✓ Unlimited rooms</li>
								<li>✓ Password protection</li>
								<li>✓ Custom username</li>
							</ul>
						</div>
					</div>

					<div className="text-center">
						<Link
							href="/pricing"
							className="inline-block px-8 py-3 bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors"
						>
							VIEW PRICING & UPGRADE
						</Link>
					</div>
				</div>

				{/* Payment Process */}
				<div className="mb-16">
					<h2 className="text-2xl font-mono text-white text-center mb-8">
						How to <span className="text-green-500">Upgrade to Pro</span>
					</h2>

					<div className="grid md:grid-cols-4 gap-4">
						<div className="bg-zinc-900/50 border border-zinc-800 p-6 text-center">
							<div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 font-mono font-bold flex items-center justify-center mx-auto mb-4">
								1
							</div>
							<h3 className="text-white font-mono text-sm mb-2">Click Upgrade</h3>
							<p className="text-zinc-500 font-mono text-xs">
								Click "Upgrade to Pro" button on pricing page
							</p>
						</div>

						<div className="bg-zinc-900/50 border border-zinc-800 p-6 text-center">
							<div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 font-mono font-bold flex items-center justify-center mx-auto mb-4">
								2
							</div>
							<h3 className="text-white font-mono text-sm mb-2">Enter Email</h3>
							<p className="text-zinc-500 font-mono text-xs">
								Provide your email for receipt and license key
							</p>
						</div>

						<div className="bg-zinc-900/50 border border-zinc-800 p-6 text-center">
							<div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 font-mono font-bold flex items-center justify-center mx-auto mb-4">
								3
							</div>
							<h3 className="text-white font-mono text-sm mb-2">Pay Securely</h3>
							<p className="text-zinc-500 font-mono text-xs">
								Pay via QRIS, cards, or e-wallet through Xendit
							</p>
						</div>

						<div className="bg-zinc-900/50 border border-zinc-800 p-6 text-center">
							<div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 font-mono font-bold flex items-center justify-center mx-auto mb-4">
								4
							</div>
							<h3 className="text-white font-mono text-sm mb-2">Get License</h3>
							<p className="text-zinc-500 font-mono text-xs">
								Receive license key instantly and start using Pro
							</p>
						</div>
					</div>
				</div>

				{/* Payment Methods */}
				<div className="bg-zinc-900/50 border border-zinc-800 p-8 text-center">
					<h3 className="text-white font-mono text-lg mb-4">Secure Payment via Xendit</h3>
					<p className="text-zinc-400 font-mono text-sm mb-6">
						We accept multiple payment methods for your convenience
					</p>
					<div className="flex items-center justify-center gap-4 flex-wrap">
						<div className="border border-zinc-700 px-4 py-2 text-zinc-400 font-mono text-xs">
							QRIS
						</div>
						<div className="border border-zinc-700 px-4 py-2 text-zinc-400 font-mono text-xs">
							Visa / Mastercard
						</div>
						<div className="border border-zinc-700 px-4 py-2 text-zinc-400 font-mono text-xs">
							GoPay
						</div>
						<div className="border border-zinc-700 px-4 py-2 text-zinc-400 font-mono text-xs">
							OVO
						</div>
						<div className="border border-zinc-700 px-4 py-2 text-zinc-400 font-mono text-xs">
							Dana
						</div>
					</div>
					<p className="text-zinc-600 font-mono text-xs mt-4">
						✓ Secure payment processing • ✓ Instant activation • ✓ Cancel anytime
					</p>
				</div>

				{/* CTA */}
				<div className="text-center mt-12">
					<Link
						href="/"
						className="inline-block px-8 py-3 bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors mr-4"
					>
						TRY IT NOW - FREE
					</Link>
					<Link
						href="/pricing"
						className="inline-block px-8 py-3 border border-green-500 text-green-500 font-mono text-sm font-bold hover:bg-green-500/10 transition-colors"
					>
						VIEW PRICING
					</Link>
				</div>
			</div>

			<Footer />
		</main>
	);
}
