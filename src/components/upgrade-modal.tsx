"use client";

import { QrCode, CreditCard, Smartphone } from "lucide-react";

interface UpgradeModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div 
				className="absolute inset-0 bg-black/80 backdrop-blur-sm"
				onClick={onClose}
			/>
			
			{/* Modal */}
			<div className="relative bg-zinc-900 border border-green-500/30 p-6 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(34,197,94,0.15)]">
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
				>
					✕
				</button>

				{/* Header */}
				<div className="text-center mb-6">
					<p className="text-green-500 font-mono text-sm mb-2">{">"}private_chat_</p>
					<h2 className="font-mono text-xl text-white">
						Upgrade ke Pro <span>🚀</span>
					</h2>
				</div>

				{/* Comparison Table */}
				<div className="mb-6">
					<table className="w-full font-mono text-sm">
						<thead>
							<tr className="border-b border-zinc-800">
								<th className="text-left py-2 text-zinc-500 font-normal">Fitur</th>
								<th className="text-center py-2 text-zinc-500 font-normal">Free</th>
								<th className="text-center py-2 text-green-500 font-normal">Pro</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b border-zinc-800/50">
								<td className="py-3 text-zinc-300">Durasi room</td>
								<td className="py-3 text-center text-zinc-400">10 menit</td>
								<td className="py-3 text-center text-green-400">Sampai 6 jam</td>
							</tr>
							<tr className="border-b border-zinc-800/50">
								<td className="py-3 text-zinc-300">Peserta</td>
								<td className="py-3 text-center text-zinc-400">2 orang</td>
								<td className="py-3 text-center text-green-400">5 orang</td>
							</tr>
							<tr className="border-b border-zinc-800/50">
								<td className="py-3 text-zinc-300">Rooms/hari</td>
								<td className="py-3 text-center text-zinc-400">3</td>
								<td className="py-3 text-center text-green-400">Unlimited</td>
							</tr>
							<tr className="border-b border-zinc-800/50">
								<td className="py-3 text-zinc-300">Password room</td>
								<td className="py-3 text-center text-red-500">✗</td>
								<td className="py-3 text-center text-green-500">✓</td>
							</tr>
							<tr>
								<td className="py-3 text-zinc-300">Custom nama</td>
								<td className="py-3 text-center text-red-500">✗</td>
								<td className="py-3 text-center text-green-500">✓</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Price */}
				<div className="text-center mb-4">
					<div className="font-mono">
						<span className="text-2xl text-white">Rp 49.000</span>
						<span className="text-zinc-500 text-sm">/bulan</span>
					</div>
					<p className="text-zinc-600 text-xs font-mono mt-1">
						Bisa cancel kapan saja
					</p>
				</div>

				{/* Payment Methods */}
				<div className="text-center mb-6">
					<p className="text-zinc-500 font-mono text-xs mb-2">Metode pembayaran:</p>
					<div className="flex items-center justify-center gap-3 text-xs font-mono text-zinc-500">
						<span className="flex items-center gap-1">
							<QrCode className="w-3.5 h-3.5" /> QRIS
						</span>
						<span className="flex items-center gap-1">
							<CreditCard className="w-3.5 h-3.5" /> Visa / Mastercard
						</span>
						<span className="flex items-center gap-1">
							<Smartphone className="w-3.5 h-3.5" /> GoPay / OVO / Dana
						</span>
					</div>
				</div>

				{/* Buttons */}
				<div className="space-y-3">
					<button className="w-full py-3 bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors">
						BAYAR SEKARANG
					</button>
					<button
						onClick={onClose}
						className="w-full py-2 text-zinc-500 font-mono text-sm hover:text-zinc-300 transition-colors"
					>
						Nanti dulu
					</button>
				</div>
			</div>
		</div>
	);
}
