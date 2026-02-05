import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ContactPage() {
	return (
		<main className="min-h-screen bg-zinc-950">
			<Navbar currentPage="contact" />

			<div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-mono font-bold mb-4">
						Contact <span className="text-green-500">Us</span>
					</h1>
					<p className="text-zinc-400 font-mono text-lg">
						Get in touch with our team
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6 mb-12">
					<div className="bg-zinc-900/50 border border-zinc-800 p-6 text-center">
						<div className="w-12 h-12 rounded-full border border-green-500/30 flex items-center justify-center mx-auto mb-4">
							<Mail className="w-6 h-6 text-green-500" />
						</div>
						<h3 className="text-white font-mono text-sm mb-2">Email</h3>
						<a
							href="mailto:helmipraditaa@gmail.com"
							className="text-green-500 font-mono text-sm hover:underline"
						>
							helmipraditaa@gmail.com
						</a>
					</div>

					<div className="bg-zinc-900/50 border border-zinc-800 p-6 text-center">
						<div className="w-12 h-12 rounded-full border border-green-500/30 flex items-center justify-center mx-auto mb-4">
							<Phone className="w-6 h-6 text-green-500" />
						</div>
						<h3 className="text-white font-mono text-sm mb-2">Phone</h3>
						<a
							href="tel:+6285708572498"
							className="text-green-500 font-mono text-sm hover:underline"
						>
							+62 857-0857-2498
						</a>
					</div>

					<div className="bg-zinc-900/50 border border-zinc-800 p-6 text-center">
						<div className="w-12 h-12 rounded-full border border-green-500/30 flex items-center justify-center mx-auto mb-4">
							<MapPin className="w-6 h-6 text-green-500" />
						</div>
						<h3 className="text-white font-mono text-sm mb-2">Address</h3>
						<p className="text-zinc-400 font-mono text-sm">
							Mojokerto, Jawa Timur<br />61364, Indonesia
						</p>
					</div>
				</div>

				<div className="bg-zinc-900/50 border border-zinc-800 p-8">
					<h2 className="text-2xl font-mono text-white mb-6">Business Information</h2>
					<div className="space-y-4">
						<div className="flex flex-col md:flex-row md:items-center gap-2">
							<span className="text-green-500 font-mono text-sm w-32">Company Name:</span>
							<span className="text-zinc-300 font-mono text-sm">HAEL DIGITAL CREATIVE</span>
						</div>
						<div className="flex flex-col md:flex-row md:items-center gap-2">
							<span className="text-green-500 font-mono text-sm w-32">Owner:</span>
							<span className="text-zinc-300 font-mono text-sm">Helmi Pradita</span>
						</div>
						<div className="flex flex-col md:flex-row md:items-center gap-2">
							<span className="text-green-500 font-mono text-sm w-32">Email:</span>
							<span className="text-zinc-300 font-mono text-sm">helmipraditaa@gmail.com</span>
						</div>
						<div className="flex flex-col md:flex-row md:items-center gap-2">
							<span className="text-green-500 font-mono text-sm w-32">Phone:</span>
							<span className="text-zinc-300 font-mono text-sm">+62 857-0857-2498</span>
						</div>
						<div className="flex flex-col md:flex-row md:items-start gap-2">
							<span className="text-green-500 font-mono text-sm w-32">Address:</span>
							<span className="text-zinc-300 font-mono text-sm">
								Mojokerto, Jawa Timur 61364, Indonesia
							</span>
						</div>
					</div>
				</div>

				<div className="bg-zinc-900/50 border border-zinc-800 p-8 mt-6">
					<h2 className="text-2xl font-mono text-white mb-4">Support Hours</h2>
					<p className="text-zinc-300 font-mono text-sm mb-4">
						Our support team is available to assist you:
					</p>
					<div className="space-y-2 text-zinc-400 font-mono text-sm">
						<p>Monday - Friday: 9:00 AM - 6:00 PM (WIB)</p>
						<p>Saturday: 9:00 AM - 2:00 PM (WIB)</p>
						<p>Sunday: Closed</p>
					</div>
					<p className="text-zinc-500 font-mono text-xs mt-4">
						* Response time: Within 24 hours on business days
					</p>
				</div>
			</div>

			<Footer />
		</main>
	);
}
