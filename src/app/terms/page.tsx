import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TermsPage() {
	return (
		<main className="min-h-screen bg-zinc-950">
			<Navbar />

			<div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-mono font-bold mb-4">
						Terms of <span className="text-green-500">Service</span>
					</h1>
					<p className="text-zinc-400 font-mono text-sm">
						Last updated: January 2026
					</p>
				</div>

				<div className="bg-zinc-900/50 border border-zinc-800 p-8 space-y-8">
					<section>
						<h2 className="text-xl font-mono text-white mb-4">1. Acceptance of Terms</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							By accessing and using Private Chat, you accept and agree to be bound by the terms and provision of this agreement. 
							If you do not agree to these terms, please do not use our service.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">2. Service Description</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mb-3">
							Private Chat provides temporary, self-destructing chat rooms for private communication. Our service includes:
						</p>
						<ul className="list-disc list-inside text-zinc-300 font-mono text-sm space-y-2 ml-4">
							<li>Creation of temporary chat rooms with configurable TTL (Time To Live)</li>
							<li>Real-time messaging between participants</li>
							<li>Automatic deletion of messages and rooms after TTL expires</li>
							<li>Optional password protection for rooms (Pro feature)</li>
							<li>Custom usernames (Pro feature)</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">3. User Responsibilities</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mb-3">
							You agree to:
						</p>
						<ul className="list-disc list-inside text-zinc-300 font-mono text-sm space-y-2 ml-4">
							<li>Use the service only for lawful purposes</li>
							<li>Not transmit any harmful, threatening, abusive, or illegal content</li>
							<li>Not attempt to gain unauthorized access to our systems</li>
							<li>Not use the service to spam or harass other users</li>
							<li>Not share room links with unauthorized parties if the room is password-protected</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">4. Privacy and Data</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							We are committed to protecting your privacy. All messages are automatically deleted after the room TTL expires. 
							We do not store message history or personal information beyond what is necessary to provide the service. 
							For more details, please read our Privacy Policy.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">5. Pro Subscription</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mb-3">
							Pro subscriptions are billed monthly and include:
						</p>
						<ul className="list-disc list-inside text-zinc-300 font-mono text-sm space-y-2 ml-4">
							<li>Extended room duration (up to 6 hours)</li>
							<li>Increased participant limit (up to 5 users)</li>
							<li>Password-protected rooms</li>
							<li>Custom usernames</li>
							<li>Unlimited room creation</li>
						</ul>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mt-3">
							Subscriptions can be cancelled at any time. Refunds are available within 7 days of purchase.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">6. Payment Terms</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							Payments are processed securely through Xendit. We accept QRIS, credit/debit cards, and e-wallets. 
							All prices are in IDR (Indonesian Rupiah). By subscribing, you authorize us to charge your payment method on a recurring basis.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">7. Service Availability</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							We strive to maintain 99.9% uptime, but we do not guarantee uninterrupted service. 
							We reserve the right to modify, suspend, or discontinue the service at any time without notice.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">8. Limitation of Liability</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							Private Chat is provided "as is" without warranties of any kind. We are not liable for any damages arising from 
							the use or inability to use our service, including but not limited to data loss, service interruptions, or 
							unauthorized access to your communications.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">9. Termination</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							We reserve the right to terminate or suspend access to our service immediately, without prior notice, 
							for any violation of these Terms of Service.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">10. Changes to Terms</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							We may update these terms from time to time. Continued use of the service after changes constitutes 
							acceptance of the new terms.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">11. Contact Information</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							For questions about these Terms of Service, please contact us:
						</p>
						<div className="mt-3 space-y-1 text-zinc-300 font-mono text-sm">
							<p>HAEL DIGITAL CREATIVE</p>
							<p>Email: helmipraditaa@gmail.com</p>
							<p>Phone: +62 857-0857-2498</p>
							<p>Address: Mojokerto, Jawa Timur 61364, Indonesia</p>
						</div>
					</section>
				</div>
			</div>

			<Footer />
		</main>
	);
}
