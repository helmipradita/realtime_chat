import Link from "next/link";
import { MessageSquare, CreditCard, Info, Mail, HelpCircle, Monitor } from "lucide-react";

interface NavbarProps {
	currentPage?: "home" | "pricing" | "about" | "contact" | "how-it-works" | "demo";
}

export function Navbar({ currentPage = "home" }: NavbarProps) {
	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
			<div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
				<Link href="/" className="text-green-500 font-mono font-bold">
					{">"}private_chat
				</Link>
				<div className="flex items-center gap-6">
					<Link
						href="/"
						className={`text-sm font-mono flex items-center gap-2 ${
							currentPage === "home"
								? "text-green-500"
								: "text-zinc-400 hover:text-zinc-200"
						}`}
					>
						<MessageSquare className="w-4 h-4" /> ROOM
					</Link>
					<Link
						href="/demo"
						className={`text-sm font-mono flex items-center gap-2 ${
							currentPage === "demo"
								? "text-green-500"
								: "text-zinc-400 hover:text-zinc-200"
						}`}
					>
						<Monitor className="w-4 h-4" /> DEMO
					</Link>
					<Link
						href="/pricing"
						className={`text-sm font-mono flex items-center gap-2 ${
							currentPage === "pricing"
								? "text-green-500"
								: "text-zinc-400 hover:text-zinc-200"
						}`}
					>
						<CreditCard className="w-4 h-4" /> PRICING
					</Link>
					<Link
						href="/about"
						className={`text-sm font-mono flex items-center gap-2 ${
							currentPage === "about"
								? "text-green-500"
								: "text-zinc-400 hover:text-zinc-200"
						}`}
					>
						<Info className="w-4 h-4" /> ABOUT
					</Link>
					<Link
						href="/contact"
						className={`text-sm font-mono flex items-center gap-2 ${
							currentPage === "contact"
								? "text-green-500"
								: "text-zinc-400 hover:text-zinc-200"
						}`}
					>
						<Mail className="w-4 h-4" /> CONTACT
					</Link>
				</div>
			</div>
		</nav>
	);
}
