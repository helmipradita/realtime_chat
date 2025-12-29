"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageSquare, CreditCard, QrCode, Smartphone } from "lucide-react";

const FAQ_ITEMS = [
	{
		question: "Bagaimana cara upgrade?",
		answer: "Klik tombol 'Upgrade ke Pro' dan pilih metode pembayaran yang kamu inginkan. Setelah pembayaran berhasil, akun kamu akan langsung ter-upgrade."
	},
	{
		question: "Metode pembayaran apa saja?",
		answer: "Kami menerima QRIS, kartu kredit/debit (Visa, Mastercard), dan e-wallet (GoPay, OVO, Dana) melalui Xendit."
	},
	{
		question: "Bisa refund?",
		answer: "Ya, kamu bisa request refund dalam 7 hari pertama setelah pembayaran jika belum puas dengan layanan kami."
	},
	{
		question: "Data saya aman?",
		answer: "Semua pesan dienkripsi dan akan otomatis terhapus setelah TTL berakhir. Kami tidak menyimpan history chat."
	},
];

export default function PricingPage() {
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	return (
		<main className="min-h-screen bg-zinc-950 py-16 px-4">
			{/* Header */}
			<nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
				<div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
					<Link href="/" className="text-green-500 font-mono font-bold">
						{">"}_private_chat
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
				{/* Title */}
				<div className="text-center mb-12">
					<h1 className="text-3xl font-mono mb-3">
						Simple <span className="text-green-500">Pricing</span>
					</h1>
					<p className="text-zinc-500 font-mono text-sm">
						Pilih plan yang sesuai dengan kebutuhan kamu.
						<br />
						Upgrade atau downgrade kapan saja.
					</p>
				</div>

				{/* Pricing Cards */}
				<div className="grid md:grid-cols-2 gap-6 mb-12">
					{/* FREE Plan */}
					<div className="border border-zinc-800 bg-zinc-900/50 p-6">
						<div className="text-center mb-6">
							<h2 className="text-zinc-400 font-mono text-sm mb-2">FREE</h2>
							<div className="font-mono">
								<span className="text-3xl text-white">Rp 0</span>
							</div>
						</div>

						<ul className="space-y-3 mb-6 font-mono text-sm">
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Room duration: max 10 menit
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> 2 peserta per room
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Auto-generated username
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> 3 rooms per hari
							</li>
							<li className="flex items-center gap-2 text-zinc-600">
								<span className="text-zinc-600">✗</span> <s>Extended duration (6 jam)</s>
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

						<Link
							href="/"
							className="block w-full text-center py-3 border border-green-500 text-green-500 font-mono text-sm hover:bg-green-500/10 transition-colors"
						>
							MULAI GRATIS
						</Link>
					</div>

					{/* PRO Plan */}
					<div className="border border-green-500/50 bg-zinc-900/50 p-6 relative">
						{/* Recommended Badge */}
						<div className="absolute -top-3 left-1/2 -translate-x-1/2">
							<span className="bg-green-500 text-black text-xs font-mono px-3 py-1 rounded-full">
								✨ RECOMMENDED
							</span>
						</div>

						<div className="text-center mb-6 pt-2">
							<h2 className="text-green-500 font-mono text-sm mb-2">PRO</h2>
							<div className="font-mono">
								<span className="text-3xl text-white">Rp 49.000</span>
								<span className="text-zinc-500 text-sm">/bulan</span>
							</div>
						</div>

						<ul className="space-y-3 mb-6 font-mono text-sm">
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Room duration: max 10 menit
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> Extended duration: sampai 6 jam
							</li>
							<li className="flex items-center gap-2 text-zinc-300">
								<span className="text-green-500">✓</span> 5 peserta per room
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

						<button className="w-full py-3 bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors">
							UPGRADE KE PRO
						</button>
					</div>
				</div>

				{/* Payment Info */}
				<div className="text-center mb-12">
					<p className="text-zinc-500 font-mono text-sm mb-4">
						Pembayaran via <span className="text-green-500">Xendit</span>
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
					<p className="text-zinc-600 font-mono text-xs mt-4">
						✓ Bisa cancel kapan saja
					</p>
				</div>

				{/* FAQ */}
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
									<span className="text-zinc-500">
										{openFaq === index ? "∧" : "∨"}
									</span>
								</button>
								{openFaq === index && (
									<div className="px-4 pb-4">
										<p className="font-mono text-sm text-zinc-500">
											{item.answer}
										</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Footer */}
				<div className="text-center mt-12 pt-8 border-t border-zinc-800">
					<p className="text-zinc-600 font-mono text-xs">
						Punya pertanyaan? Hubungi kami di{" "}
						<a href="mailto:support@privatechat.id" className="text-green-500 hover:underline">
							support@privatechat.id
						</a>
					</p>
				</div>
			</div>
		</main>
	);
}
