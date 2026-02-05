import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Play, CheckCircle } from "lucide-react";

export default function DemoPage() {
	return (
		<main className="min-h-screen bg-zinc-950">
			<Navbar />

			<div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl font-mono font-bold mb-4">
						Product <span className="text-green-500">Demo</span>
					</h1>
					<p className="text-zinc-400 font-mono text-lg mb-8">
						See Private Chat in action with real screenshots and examples
					</p>
					<Link
						href="/"
						className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors"
					>
						<Play className="w-4 h-4" />
						TRY IT NOW - FREE
					</Link>
				</div>

				{/* Screenshot 1: Homepage */}
				<div className="mb-20">
					<div className="mb-6">
						<h2 className="text-2xl font-mono text-white mb-2">1. Create Your Room</h2>
						<p className="text-zinc-400 font-mono text-sm">
							Start by creating a secure chat room with customizable settings
						</p>
					</div>
					<div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg">
						<div className="bg-zinc-950 border border-zinc-800 p-6 max-w-md mx-auto">
							{/* Mock Homepage */}
							<div className="text-center mb-6">
								<h3 className="text-green-500 font-mono text-xl mb-2">{">"}private chat_</h3>
								<p className="text-zinc-500 font-mono text-xs">A private, self-destructing chat room.</p>
							</div>

							<div className="space-y-4">
								{/* Plan Indicator */}
								<div className="flex items-center justify-between text-xs font-mono">
									<span className="text-zinc-500">Plan:</span>
									<span className="text-white">Free</span>
								</div>

								{/* TTL Options */}
								<div>
									<label className="text-zinc-500 font-mono text-xs mb-2 block">Room Duration (TTL)</label>
									<div className="grid grid-cols-2 gap-2">
										<div className="bg-green-500/20 border border-green-500 p-2 text-center">
											<span className="text-green-400 font-mono text-xs">10 min</span>
										</div>
										<div className="bg-zinc-900 border border-zinc-800 p-2 text-center relative">
											<span className="text-zinc-500 font-mono text-xs">30 min</span>
											<span className="absolute top-0 right-0 bg-green-500/20 text-green-500 text-[8px] px-1 rounded">PRO</span>
										</div>
										<div className="bg-zinc-900 border border-zinc-800 p-2 text-center relative">
											<span className="text-zinc-500 font-mono text-xs">1 hour</span>
											<span className="absolute top-0 right-0 bg-green-500/20 text-green-500 text-[8px] px-1 rounded">PRO</span>
										</div>
										<div className="bg-zinc-900 border border-zinc-800 p-2 text-center relative">
											<span className="text-zinc-500 font-mono text-xs">6 hours</span>
											<span className="absolute top-0 right-0 bg-green-500/20 text-green-500 text-[8px] px-1 rounded">PRO</span>
										</div>
									</div>
								</div>

								{/* Create Button */}
								<button className="w-full py-2 bg-green-500 text-black font-mono text-xs font-bold">
									CREATE SECURE ROOM
								</button>
							</div>
						</div>
					</div>
					<div className="mt-4 flex items-start gap-2 text-zinc-400 font-mono text-sm">
						<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
						<span>Choose room duration, password protection (Pro), and participant limit</span>
					</div>
				</div>

				{/* Screenshot 2: Chat Room */}
				<div className="mb-20">
					<div className="mb-6">
						<h2 className="text-2xl font-mono text-white mb-2">2. Chat in Real-Time</h2>
						<p className="text-zinc-400 font-mono text-sm">
							Send messages instantly with live updates and countdown timer
						</p>
					</div>
					<div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg">
						<div className="bg-zinc-950 border border-zinc-800">
							{/* Header */}
							<div className="border-b border-zinc-800 p-4 flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div>
										<div className="text-zinc-500 font-mono text-[10px]">ROOM ID</div>
										<div className="text-green-500 font-mono text-sm font-bold">2ax-zpbzv8M-no1dx1xqd</div>
									</div>
									<div className="h-6 w-px bg-zinc-800"></div>
									<div>
										<div className="text-zinc-500 font-mono text-[10px]">SELF-DESTRUCT</div>
										<div className="text-amber-500 font-mono text-sm font-bold">09:45</div>
									</div>
								</div>
								<button className="text-[10px] bg-zinc-800 px-2 py-1 text-zinc-400 font-mono">
									💣 DESTROY NOW
								</button>
							</div>

							{/* Messages */}
							<div className="p-4 space-y-3 min-h-[200px]">
								<div>
									<div className="flex items-center gap-2 mb-1">
										<span className="text-green-500 font-mono text-[10px] font-bold">YOU</span>
										<span className="text-zinc-600 font-mono text-[8px]">14:23</span>
									</div>
									<p className="text-zinc-300 font-mono text-xs">Hey! Thanks for joining 👋</p>
								</div>
								<div>
									<div className="flex items-center gap-2 mb-1">
										<span className="text-blue-500 font-mono text-[10px] font-bold">USER_ABC</span>
										<span className="text-zinc-600 font-mono text-[8px]">14:23</span>
									</div>
									<p className="text-zinc-300 font-mono text-xs">No problem! This is cool 🔥</p>
								</div>
								<div>
									<div className="flex items-center gap-2 mb-1">
										<span className="text-green-500 font-mono text-[10px] font-bold">YOU</span>
										<span className="text-zinc-600 font-mono text-[8px]">14:24</span>
									</div>
									<p className="text-zinc-300 font-mono text-xs">All messages auto-delete after 10 min</p>
								</div>
							</div>

							{/* Input */}
							<div className="border-t border-zinc-800 p-4">
								<div className="flex gap-2">
									<div className="flex-1 relative">
										<span className="absolute left-2 top-1/2 -translate-y-1/2 text-green-500 font-mono text-xs">{">"}</span>
										<input
											type="text"
											placeholder="Type message..."
											className="w-full bg-black border border-zinc-800 py-2 pl-6 pr-2 text-zinc-300 font-mono text-xs"
											disabled
										/>
									</div>
									<button className="bg-zinc-800 text-zinc-400 px-4 font-mono text-xs">
										SEND
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-4 flex items-start gap-2 text-zinc-400 font-mono text-sm">
						<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
						<span>Real-time messaging with countdown timer showing time until auto-deletion</span>
					</div>
				</div>

				{/* Screenshot 3: Upgrade Modal */}
				<div className="mb-20">
					<div className="mb-6">
						<h2 className="text-2xl font-mono text-white mb-2">3. Upgrade to Pro</h2>
						<p className="text-zinc-400 font-mono text-sm">
							Simple payment process with multiple payment methods via Xendit
						</p>
					</div>
					<div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg">
						<div className="bg-zinc-950 border border-green-500/30 p-6 max-w-md mx-auto">
							{/* Modal Header */}
							<div className="text-center mb-6">
								<p className="text-green-500 font-mono text-xs mb-2">{">"}private_chat_</p>
								<h3 className="font-mono text-lg text-white">Upgrade to Pro 🚀</h3>
							</div>

							{/* Comparison */}
							<div className="mb-6">
								<table className="w-full font-mono text-[10px]">
									<thead>
										<tr className="border-b border-zinc-800">
											<th className="text-left py-2 text-zinc-500 font-normal">Feature</th>
											<th className="text-center py-2 text-zinc-500 font-normal">Free</th>
											<th className="text-center py-2 text-green-500 font-normal">Pro</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-b border-zinc-800/50">
											<td className="py-2 text-zinc-300">Duration</td>
											<td className="py-2 text-center text-zinc-400">10 min</td>
											<td className="py-2 text-center text-green-400">6 hours</td>
										</tr>
										<tr className="border-b border-zinc-800/50">
											<td className="py-2 text-zinc-300">Participants</td>
											<td className="py-2 text-center text-zinc-400">2</td>
											<td className="py-2 text-center text-green-400">5</td>
										</tr>
										<tr>
											<td className="py-2 text-zinc-300">Password</td>
											<td className="py-2 text-center text-red-500">✗</td>
											<td className="py-2 text-center text-green-500">✓</td>
										</tr>
									</tbody>
								</table>
							</div>

							{/* Email Input */}
							<div className="mb-4">
								<label className="text-zinc-500 font-mono text-[10px] mb-1 block">Email (for receipt)</label>
								<input
									type="email"
									placeholder="email@example.com"
									className="w-full bg-zinc-900 border border-zinc-800 p-2 font-mono text-xs text-zinc-300"
									disabled
								/>
							</div>

							{/* Price */}
							<div className="text-center mb-4">
								<div className="font-mono">
									<span className="text-2xl text-white">Rp 75.000</span>
									<span className="text-zinc-500 text-xs">/month</span>
								</div>
								<p className="text-zinc-600 text-[10px] font-mono mt-1">Cancel anytime</p>
							</div>

							{/* Payment Methods */}
							<div className="text-center mb-4">
								<p className="text-zinc-500 font-mono text-[10px] mb-2">Payment methods:</p>
								<div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500">
									<span>QRIS</span>
									<span>•</span>
									<span>Cards</span>
									<span>•</span>
									<span>E-wallet</span>
								</div>
							</div>

							{/* Button */}
							<button className="w-full py-2 bg-green-500 text-black font-mono text-xs font-bold">
								PAY NOW
							</button>
						</div>
					</div>
					<div className="mt-4 flex items-start gap-2 text-zinc-400 font-mono text-sm">
						<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
						<span>Secure payment via Xendit with QRIS, credit cards, and e-wallets (GoPay, OVO, Dana)</span>
					</div>
				</div>

				{/* Screenshot 4: License Activation */}
				<div className="mb-20">
					<div className="mb-6">
						<h2 className="text-2xl font-mono text-white mb-2">4. Activate Your License</h2>
						<p className="text-zinc-400 font-mono text-sm">
							Receive license key instantly after payment and activate Pro features
						</p>
					</div>
					<div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg">
						<div className="bg-zinc-950 border border-green-500/30 p-6 max-w-md mx-auto">
							{/* Success Header */}
							<div className="text-center mb-6">
								<p className="text-green-500 font-mono text-xs mb-2">{">"}private_chat_</p>
								<h3 className="font-mono text-lg text-white">Pro Activated! 🎉</h3>
							</div>

							{/* License Key Display */}
							<div className="bg-green-500/10 border border-green-500/30 p-4 text-center mb-4">
								<p className="text-green-400 font-mono text-xs mb-2">Your License Key:</p>
								<p className="text-white font-mono text-sm font-bold select-all">
									PRIV-A8F2-X9K4-M3L7
								</p>
								<p className="text-zinc-500 font-mono text-[10px] mt-2">
									Save this key! You'll need it to activate on other devices.
								</p>
							</div>

							{/* Buttons */}
							<button className="w-full py-2 border border-zinc-700 text-zinc-400 font-mono text-xs mb-2">
								📋 Copy License Key
							</button>
							<button className="w-full py-2 bg-green-500 text-black font-mono text-xs font-bold">
								START USING PRO
							</button>
						</div>
					</div>
					<div className="mt-4 flex items-start gap-2 text-zinc-400 font-mono text-sm">
						<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
						<span>License key format: PRIV-XXXX-XXXX-XXXX with auto-formatting as you type</span>
					</div>
				</div>

				{/* Features Summary */}
				<div className="bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/30 p-8 rounded-lg">
					<h2 className="text-2xl font-mono text-white text-center mb-8">
						Why Choose <span className="text-green-500">Private Chat</span>?
					</h2>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="text-center">
							<div className="text-3xl mb-3">🔒</div>
							<h3 className="text-white font-mono text-sm mb-2">Privacy First</h3>
							<p className="text-zinc-400 font-mono text-xs">
								No registration, no tracking, messages auto-delete
							</p>
						</div>
						<div className="text-center">
							<div className="text-3xl mb-3">⚡</div>
							<h3 className="text-white font-mono text-sm mb-2">Instant Setup</h3>
							<p className="text-zinc-400 font-mono text-xs">
								Create room in seconds, share link, start chatting
							</p>
						</div>
						<div className="text-center">
							<div className="text-3xl mb-3">💳</div>
							<h3 className="text-white font-mono text-sm mb-2">Secure Payment</h3>
							<p className="text-zinc-400 font-mono text-xs">
								Multiple payment options via Xendit Indonesia
							</p>
						</div>
					</div>
				</div>

				{/* CTA */}
				<div className="text-center mt-12">
					<h3 className="text-2xl font-mono text-white mb-4">Ready to Try?</h3>
					<div className="flex items-center justify-center gap-4">
						<Link
							href="/"
							className="inline-block px-8 py-3 bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors"
						>
							START FREE
						</Link>
						<Link
							href="/pricing"
							className="inline-block px-8 py-3 border border-green-500 text-green-500 font-mono text-sm font-bold hover:bg-green-500/10 transition-colors"
						>
							VIEW PRICING
						</Link>
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}
