import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
	return (
		<main className="min-h-screen bg-zinc-950">
			<Navbar />

			<div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-mono font-bold mb-4">
						Privacy <span className="text-green-500">Policy</span>
					</h1>
					<p className="text-zinc-400 font-mono text-sm">
						Last updated: January 2026
					</p>
				</div>

				<div className="bg-zinc-900/50 border border-zinc-800 p-8 space-y-8">
					<section>
						<h2 className="text-xl font-mono text-white mb-4">1. Introduction</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							At Private Chat, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect 
							your information when you use our service. We are committed to maintaining the confidentiality and security of 
							your data.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">2. Information We Collect</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mb-3">
							We collect minimal information necessary to provide our service:
						</p>
						<ul className="list-disc list-inside text-zinc-300 font-mono text-sm space-y-2 ml-4">
							<li><strong>Messages:</strong> Temporarily stored in Redis and automatically deleted after room TTL expires</li>
							<li><strong>Room Metadata:</strong> Room ID, creation time, TTL, participant count (automatically deleted)</li>
							<li><strong>License Information (Pro users):</strong> Email address, license key, subscription status</li>
							<li><strong>Technical Data:</strong> IP address (for security), browser type, device information</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">3. How We Use Your Information</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mb-3">
							We use collected information to:
						</p>
						<ul className="list-disc list-inside text-zinc-300 font-mono text-sm space-y-2 ml-4">
							<li>Provide and maintain the chat service</li>
							<li>Process Pro subscription payments</li>
							<li>Send license keys and receipts to Pro users</li>
							<li>Prevent abuse and ensure service security</li>
							<li>Improve our service and user experience</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">4. Data Storage and Retention</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mb-3">
							Our data retention policy:
						</p>
						<ul className="list-disc list-inside text-zinc-300 font-mono text-sm space-y-2 ml-4">
							<li><strong>Messages:</strong> Automatically deleted after room TTL expires (10 minutes to 6 hours)</li>
							<li><strong>Room Data:</strong> Automatically deleted when room expires</li>
							<li><strong>License Data:</strong> Retained for the duration of your subscription plus 30 days</li>
							<li><strong>Payment Records:</strong> Retained for 7 years for tax and legal compliance</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">5. Data Security</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							We implement industry-standard security measures to protect your data:
						</p>
						<ul className="list-disc list-inside text-zinc-300 font-mono text-sm space-y-2 ml-4 mt-3">
							<li>HTTPS encryption for all data transmission</li>
							<li>Secure Redis database with authentication</li>
							<li>Regular security audits and updates</li>
							<li>Limited access to production systems</li>
							<li>Automatic data deletion after TTL</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">6. Third-Party Services</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mb-3">
							We use the following third-party services:
						</p>
						<ul className="list-disc list-inside text-zinc-300 font-mono text-sm space-y-2 ml-4">
							<li><strong>Xendit:</strong> Payment processing (subject to Xendit's privacy policy)</li>
							<li><strong>Upstash Redis:</strong> Message and room data storage</li>
							<li><strong>Vercel:</strong> Hosting and deployment</li>
						</ul>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mt-3">
							These services have their own privacy policies and we encourage you to review them.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">7. Cookies and Tracking</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							We use minimal cookies and local storage:
						</p>
						<ul className="list-disc list-inside text-zinc-300 font-mono text-sm space-y-2 ml-4 mt-3">
							<li><strong>Authentication Token:</strong> Stored in localStorage to maintain your session</li>
							<li><strong>Room Verification:</strong> Cookie to remember password-verified rooms</li>
							<li><strong>License Key:</strong> Stored locally to maintain Pro status</li>
						</ul>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mt-3">
							We do not use tracking cookies or analytics that identify individual users.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">8. Your Rights</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mb-3">
							You have the right to:
						</p>
						<ul className="list-disc list-inside text-zinc-300 font-mono text-sm space-y-2 ml-4">
							<li>Access your personal data (Pro users)</li>
							<li>Request deletion of your data</li>
							<li>Cancel your subscription at any time</li>
							<li>Opt-out of marketing communications</li>
							<li>Request a copy of your data</li>
						</ul>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed mt-3">
							To exercise these rights, contact us at helmipraditaa@gmail.com
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">9. Children's Privacy</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							Our service is not intended for users under 13 years of age. We do not knowingly collect personal information 
							from children. If you believe we have collected information from a child, please contact us immediately.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">10. International Data Transfers</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							Your data may be transferred to and processed in countries other than Indonesia. We ensure appropriate 
							safeguards are in place to protect your data in accordance with this Privacy Policy.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">11. Changes to This Policy</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
							Privacy Policy on this page and updating the "Last updated" date.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-mono text-white mb-4">12. Contact Us</h2>
						<p className="text-zinc-300 font-mono text-sm leading-relaxed">
							If you have any questions about this Privacy Policy, please contact us:
						</p>
						<div className="mt-3 space-y-1 text-zinc-300 font-mono text-sm">
							<p>HAEL DIGITAL CREATIVE</p>
							<p>Owner: Helmi Pradita</p>
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
