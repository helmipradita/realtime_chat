"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageSquare, CreditCard, QrCode, Smartphone } from "lucide-react";
import { UpgradeModal } from "@/components/upgrade-modal";
import { useLicense } from "@/hooks/use-license";

const FAQ_ITEMS = [
	{
		question: "How do I upgrade?",
		answer: "Click the 'Upgrade to Pro' button and choose your preferred payment method. After successful payment, your account will be upgraded immediately."
	},
	{
		question: "What payment methods are available?",
		answer: "We accept QRIS, credit/debit cards (Visa, Mastercard), and e-wallets (GoPay, OVO, Dana) via Xendit."
	},
	{
		question: "Can I get a refund?",
		answer: "Yes, you can request a refund within the first 7 days after payment if you're not satisfied with our service."
	},
	{
		question: "Is my data safe?",
		answer: "All messages are encrypted and automatically deleted after TTL expires. We don't store chat history."
	},
];

export default function PricingPage() {
	const [openFaq, setOpenFaq] = useState<number | null>(null);
	const [showUpgradeModal, setShowUpgradeModal] = useState(false);
	const { activateLicense } = useLicense();

	const handleUpgradeSuccess = async (licenseKey: string) => {
		await activateLicense(licenseKey);
	};

	return (
		<main className="min-h-screen bg-zinc-950 py-16 px-4">
			<nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
				<div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
					<Link href="/" className="text-green-500 font-mono font-bold">
						{">"}private_chat
					</Link>
					<div className="flex items-center gap-6">
						<Link href="/" className="text-zinc-400 hover:text-zinc-200 text-sm font-mono flex items-center gap-2">
							<MessageSquare className="w-4 h-4" /> ROOM
						</Link>
						<Link href="/pricing" className="text-green-500 text-sm font-mono flex items-center gap-2">
							<CreditCard className="w-4 h-4" /> PRICING
						</Link>
					</div>
				</div>
			</nav>

			<div className="max-w-4xl mx-auto pt-16">
				<div className="text-center mb-12">
					<h1 className="text-3xl font-mono mb-3">
						Simple <span className="text-green-500">Pricing</span>
					</h1>
					<p className="text-zinc-500 font-mono text-sm">
						Choose the plan that fits your needs.<br />
						Upgrade or downgrade anytime.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-6 mb-12">
					<div className="border border-zinc-800 bg-zinc-900/50 p-6">
						<div className="text-center mb-6">
							<h2 className="text-zinc-400 font-mono text-sm mb-2">FREE</h2>
							<div className="font-mono">
								<span className="text-3xl text-white">$0</span>
							</div>
						</div>
						<ul className="space-y-3 mb-6 font-mono text-sm">
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Room duration: max 10 min
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> 2 participants per room
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Auto-generated username
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> 3 rooms per day
							</li>
							<li className="flex items-center gap-2 text-zinc-600">
								<span className="text-zinc-600">✗</span> <s>Extended duration (6 hours)</s>
							</li>
							<li className="flex items-center gap-2 text-zinc-600">
								<span className="text-zinc-600">✗</span> <s>Password-protected rooms</s>
							</li>
							<li className="flex items-center gap-2 text-zinc-600">
								<span className="text-zinc-600">✗</span> <s>Custom username</s>
							</li>
							<li className="flex items-center gap-2 text-zinc-600">
								<span className="text-zinc-600">✗</span> <s>Unlimited rooms</s>
							</li>
						</ul>
						<Link href="/" className="block w-full text-center py-3 border border-green-500 text-green-500 font-mono text-sm hover:bg-green-500/10 transition-colors">
							START FREE
						</Link>
					</div>

					<div className="border border-green-500/50 bg-zinc-900/50 p-6 relative">
						<div className="absolute -top-3 left-1/2 -translate-x-1/2">
							<span className="bg-green-500 text-black text-xs font-mono px-3 py-1 rounded-full">
								✨ RECOMMENDED
							</span>
						</div>
						<div className="text-center mb-6 pt-2">
							<h2 className="text-green-500 font-mono text-sm mb-2">PRO</h2>
							<div className="font-mono">
								<span className="text-3xl text-white">$4.99</span>
								<span className="text-zinc-500 text-sm">/month</span>
							</div>
						</div>
						<ul className="space-y-3 mb-6 font-mono text-sm">
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Room duration: max 10 min
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Extended duration: up to 6 hours
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> 5 participants per room
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Custom username
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Unlimited rooms
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Password-protected rooms
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Priority support
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Early access features
							</li>
						</ul>
						<button onClick={() => setShowUpgradeModal(true)} className="w-full py-3 bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors">
							UPGRADE TO PRO
						</button>
					</div>
				</div>

				<div className="text-center mb-12">
					<p className="text-zinc-500 font-mono text-sm mb-4">
						Payment via <span className="text-green-500">Xendit</span>
					</p>
					<div className="flex items-center justify-center gap-3 flex-wrap">
						<span className="border border-zinc-700 px-3 py-1.5 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
							<QrCode className="w-3.5 h-3.5" /> QRIS
						</span>
						<span className="border border-zinc-700 px-3 py-1.5 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
							<CreditCard className="w-3.5 h-3.5" /> Visa
						</span>
						<span className="border border-zinc-700 px-3 py-1.5 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
							<CreditCard className="w-3.5 h-3.5" /> Mastercard
						</span>
						<span className="border border-zinc-700 px-3 py-1.5 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
							<Smartphone className="w-3.5 h-3.5" /> GoPay
						</span>
						<span className="border border-zinc-700 px-3 py-1.5 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
							<Smartphone className="w-3.5 h-3.5" /> OVO
						</span>
					</div>
					<p className="text-zinc-600 font-mono text-xs mt-4">✓ Cancel anytime</p>
				</div>

				<div className="max-w-2xl mx-auto">
					<h2 className="text-center font-mono text-xl mb-6">FAQ</h2>
					<div className="space-y-2">
						{FAQ_ITEMS.map((item, index) => (
							<div key={index} className="border border-zinc-800">
								<button
									onClick={() => setOpenFaq(openFaq === index ? null : index)}
									className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-zinc-900/50 transition-colors"
								>
									<span className={`font-mono text-sm ${openFaq === index ? "text-green-500" : "text-zinc-300"}`}>
										{item.question}
									</span>
									<span className="text-zinc-500">{openFaq === index ? "∧" : "∨"}</span>
								</button>
								{openFaq === index && (
									<div className="px-4 pb-4">
										<p className="font-mono text-sm text-zinc-500">{item.answer}</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className="text-center mt-12 pt-8 border-t border-zinc-800">
					<p className="text-zinc-600 font-mono text-xs">
						Have questions? Contact us at{" "}
						<a href="mailto:support@privatechat.io" className="text-green-500 hover:underline">
							support@privatechat.io
						</a>
					</p>
				</div>
			</div>

			<UpgradeModal
				isOpen={showUpgradeModal}
				onClose={() => setShowUpgradeModal(false)}
				onSuccess={handleUpgradeSuccess}
			/>
		</main>
	);
}
