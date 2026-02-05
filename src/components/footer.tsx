import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t border-zinc-800 py-12 mt-16 bg-zinc-900/30">
			<div className="max-w-5xl mx-auto px-4">
				<div className="grid md:grid-cols-3 gap-8 mb-8">
					{/* Company Info */}
					<div>
						<h3 className="text-green-500 font-mono font-bold mb-4">{">"}private_chat</h3>
						<p className="text-zinc-500 font-mono text-xs leading-relaxed">
							Secure, self-destructing messaging for privacy-conscious users.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-white font-mono text-sm mb-4">Quick Links</h4>
						<div className="space-y-2">
							<Link href="/" className="block text-zinc-500 hover:text-zinc-300 font-mono text-xs">
								Home
							</Link>
							<Link href="/demo" className="block text-zinc-500 hover:text-zinc-300 font-mono text-xs">
								Demo
							</Link>
							<Link href="/pricing" className="block text-zinc-500 hover:text-zinc-300 font-mono text-xs">
								Pricing
							</Link>
							<Link href="/about" className="block text-zinc-500 hover:text-zinc-300 font-mono text-xs">
								About
							</Link>
							<Link href="/contact" className="block text-zinc-500 hover:text-zinc-300 font-mono text-xs">
								Contact
							</Link>
						</div>
					</div>

					{/* Contact Info */}
					<div>
						<h4 className="text-white font-mono text-sm mb-4">Contact</h4>
						<div className="space-y-2 text-zinc-500 font-mono text-xs">
							<p>HAEL DIGITAL CREATIVE</p>
							<p>Helmi Pradita</p>
							<p>
								<a href="mailto:helmipraditaa@gmail.com" className="hover:text-zinc-300">
									helmipraditaa@gmail.com
								</a>
							</p>
							<p>
								<a href="tel:+6285708572498" className="hover:text-zinc-300">
									+62 857-0857-2498
								</a>
							</p>
							<p>Mojokerto, Jawa Timur 61364</p>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-zinc-800">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-zinc-600 font-mono text-xs text-center md:text-left">
							© 2026 Helmi Pradita (HAEL DIGITAL CREATIVE). All rights reserved.
						</p>
						<div className="flex gap-6 text-xs font-mono">
							<Link href="/terms" className="text-zinc-500 hover:text-zinc-300">
								Terms of Service
							</Link>
							<Link href="/privacy" className="text-zinc-500 hover:text-zinc-300">
								Privacy Policy
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
