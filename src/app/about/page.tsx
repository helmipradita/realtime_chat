import Link from "next/link";
import { MessageSquare, Shield, Clock, Users } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AboutPage() {
	return (
		<main className="min-h-screen bg-zinc-950">
			<Navbar currentPage="about" />

			<div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-mono font-bold mb-4">
						About <span className="text-green-500">Private Chat</span>
					</h1>
					<p className="text-zinc-400 font-mono text-lg">
						Secure, ephemeral messaging for privacy-conscious users
					</p>
				</div>

				<div className="prose prose-invert max-w-none">
					<div className="bg-zinc-900/50 border border-zinc-800 p-8 mb-8">
						<h2 className="text-2xl font-mono text-white mb-4">Our Mission</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mb-4">
							Private Chat is a secure, self-destructing messaging platform designed for users who value privacy and security. 
							We believe that private conversations should remain private, with no permanent records or data collection.
						</p>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							Our platform provides temporary chat rooms that automatically delete all messages after a set time period, 
							ensuring your conversations leave no trace.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-6 mb-8">
						<div className="bg-zinc-900/50 border border-zinc-800 p-6">
							<div className="w-12 h-12 rounded-full border border-green-500/30 flex items-center justify-center mb-4">
								<Shield className="w-6 h-6 text-green-500" />
							</div>
							<h3 className="text-xl font-mono text-white mb-3">Privacy First</h3>
							<p className="text-zinc-400 font-mono text-sm">
								No registration required. No email collection. No message history. Your privacy is our priority.
							</p>
						</div>

						<div className="bg-zinc-900/50 border border-zinc-800 p-6">
							<div className="w-12 h-12 rounded-full border border-green-500/30 flex items-center justify-center mb-4">
								<Clock className="w-6 h-6 text-green-500" />
							</div>
							<h3 className="text-xl font-mono text-white mb-3">Self-Destructing</h3>
							<p className="text-zinc-400 font-mono text-sm">
								All rooms and messages automatically delete after the TTL expires. Nothing is stored permanently.
							</p>
						</div>

						<div className="bg-zinc-900/50 border border-zinc-800 p-6">
							<div className="w-12 h-12 rounded-full border border-green-500/30 flex items-center justify-center mb-4">
								<MessageSquare className="w-6 h-6 text-green-500" />
							</div>
							<h3 className="text-xl font-mono text-white mb-3">Real-time</h3>
							<p className="text-zinc-400 font-mono text-sm">
								Messages are delivered instantly with WebSocket technology for seamless communication.
							</p>
						</div>

						<div className="bg-zinc-900/50 border border-zinc-800 p-6">
							<div className="w-12 h-12 rounded-full border border-green-500/30 flex items-center justify-center mb-4">
								<Users className="w-6 h-6 text-green-500" />
							</div>
							<h3 className="text-xl font-mono text-white mb-3">Easy to Use</h3>
							<p className="text-zinc-400 font-mono text-sm">
								Create a room, share the link, and start chatting. No complicated setup or configuration needed.
							</p>
						</div>
					</div>

					<div className="bg-zinc-900/50 border border-zinc-800 p-8">
						<h2 className="text-2xl font-mono text-white mb-4">Company Information</h2>
						<div className="space-y-3 text-zinc-300 font-mono text-sm">
							<p><span className="text-green-500">Company:</span> HAEL DIGITAL CREATIVE</p>
							<p><span className="text-green-500">Owner:</span> Helmi Pradita</p>
							<p><span className="text-green-500">Location:</span> Mojokerto, Jawa Timur 61364, Indonesia</p>
							<p><span className="text-green-500">Email:</span> helmipraditaa@gmail.com</p>
							<p><span className="text-green-500">Phone:</span> +62 857-0857-2498</p>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}
