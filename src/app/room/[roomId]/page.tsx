"use client";

import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/client";
import { useRealtime } from "@/lib/realtime-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function formatTimeRemaining(seconds: number) {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function getCookie(name: string): string | null {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
	return null;
}

function setAuthToken(token: string) {
	localStorage.setItem("x-auth-token", token);
}

function getAuthToken(): string | null {
	return localStorage.getItem("x-auth-token");
}

const Page = () => {
	const params = useParams();
	const roomId = params.roomId as string;
	const router = useRouter();
	const { username } = useUsername();

	const [input, setInput] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const [copyStatus, setCopyStatus] = useState("COPY");
	const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
	const [isJoined, setIsJoined] = useState(false);
	const [isChecking, setIsChecking] = useState(true);

	// Check room info and handle password/join
	useEffect(() => {
		const checkAndJoin = async () => {
			try {
				// Check room info
				const infoRes = await client.room.info.get({ query: { roomId } });
				
				if (!infoRes.data?.exists) {
					router.push("/?error=room-not-found");
					return;
				}

				// Check if room has password and user hasn't verified
				const passwordVerified = getCookie(`room-verified-${roomId}`);
				
				if (infoRes.data.hasPassword && !passwordVerified) {
					router.push(`/room/${roomId}/password`);
					return;
				}

				// Try to join room
				const joinRes = await client.room.join.post({ roomId });
				
				if (joinRes.data?.success && joinRes.data.token) {
					// Save token to localStorage
					setAuthToken(joinRes.data.token);
					setIsJoined(true);
				} else if (joinRes.data?.error === "room-full") {
					router.push("/?error=room-full");
					return;
				} else {
					router.push("/?error=room-not-found");
					return;
				}
			} catch (error) {
				console.error("Error checking room:", error);
				router.push("/?error=server-error");
			} finally {
				setIsChecking(false);
			}
		};

		checkAndJoin();
	}, [roomId, router]);

	const { data: ttlData } = useQuery({
		queryKey: ["ttl", roomId],
		queryFn: async () => {
			const res = await client.room.ttl.get({ query: { roomId } });
			return res.data;
		},
		enabled: isJoined,
	});

	useEffect(() => {
		if (ttlData?.ttl !== undefined) setTimeRemaining(ttlData.ttl);
	}, [ttlData]);

	useEffect(() => {
		if (timeRemaining === null || timeRemaining < 0) return;

		if (timeRemaining === 0) {
			router.push("/?destroyed=true");
			return;
		}

		const interval = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev === null || prev <= 1) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [timeRemaining, router]);

	const { data: messages, refetch } = useQuery({
		queryKey: ["messages", roomId],
		queryFn: async () => {
			const res = await client.messages.get({ query: { roomId } });
			return res.data;
		},
		enabled: isJoined,
	});

	const { mutate: sendMessage, isPending } = useMutation({
		mutationFn: async ({ text }: { text: string }) => {
			await client.messages.post({ text }, { query: { roomId } });
		},
	});

	useRealtime({
		channels: [roomId],
		events: ["chat.message", "chat.destroy"],
		onData: ({ event }) => {
			if (event === "chat.message") {
				refetch();
			}
			if (event === "chat.destroy") {
				router.push("/?destroyed=true");
			}
		},
	});

	const { mutate: destroyRoom, isPending: isDestroying } = useMutation({
		mutationFn: async () => {
			await client.room.delete(null, { query: { roomId } });
		},
	});

	const copyLink = () => {
		const url = window.location.href;
		navigator.clipboard.writeText(url);
		setCopyStatus("COPIED!");
		setTimeout(() => setCopyStatus("COPY"), 2000);
	};

	// Loading state
	if (isChecking) {
		return (
			<main className="flex items-center justify-center h-screen bg-zinc-950">
				<div className="text-center">
					<div className="animate-spin w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
					<p className="text-zinc-500 font-mono text-sm">Connecting to room...</p>
				</div>
			</main>
		);
	}

	if (!isJoined) {
		return null;
	}

	return (
		<main className="flex flex-col h-screen max-h-screen overflow-hidden">
			<header className="border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-900/30">
				<div className="flex items-center gap-4">
					<div className="flex flex-col">
						<span className="text-xs text-zinc-500 uppercase">Room ID</span>
						<div className="flex items-center gap-2">
							<span className="font-bold text-green-500">{roomId}</span>
							<button
								onClick={copyLink}
								className="text-[10px] bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded text-zinc-400 hover:text-zinc-200 transition-colors"
							>
								{copyStatus}
							</button>
						</div>
					</div>

					<div className="h-8 w-px bg-zinc-800" />
					<div className="flex flex-col">
						<span className="text-xs text-zinc-500 uppercase">Self-Destruct</span>
						<span
							className={`text-sm font-bold flex items-center gap-2 ${
								timeRemaining !== null && timeRemaining < 60 ? "text-red-500" : "text-amber-500"
							}`}
						>
							{timeRemaining !== null ? formatTimeRemaining(timeRemaining) : "--:--"}
						</span>
					</div>
				</div>
				<button
					onClick={() => destroyRoom()}
					disabled={isDestroying}
					className="text-xs bg-zinc-800 hover:bg-red-600 px-3 py-1.5 rounded text-zinc-400 hover:text-white font-bold transition-all group flex items-center gap-2 disabled:opacity-50"
				>
					<span className="group-hover:animate-pulse">💣</span>DESTROY NOW
				</button>
			</header>

			<div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
				{(!messages?.messages || messages.messages.length === 0) && (
					<div className="flex items-center justify-center h-full">
						<p className="text-zinc-600 text-sm font-mono">No messages yet, start the conversation.</p>
					</div>
				)}

				{messages?.messages?.map((msg) => (
					<div key={msg.id} className="flex flex-col items-start">
						<div className="max-w-[80%] group">
							<div className="flex items-baseline gap-3 mb-1">
								<span className={`text-xs font-bold ${msg.sender === username ? "text-green-500" : "text-blue-500"}`}>
									{msg.sender === username ? "YOU" : msg.sender}
								</span>
								<span className="text-[10px] text-zinc-600">{format(msg.timestamp, "HH:mm")}</span>
							</div>
							<p className="text-sm text-zinc-300 leading-relaxed break-all">{msg.text}</p>
						</div>
					</div>
				))}
			</div>

			<div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
				<div className="flex gap-4">
					<div className="flex-1 relative group">
						<span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 animate-pulse">{">"}</span>
						<input
							autoFocus
							value={input}
							onKeyDown={(e) => {
								if (e.key === "Enter" && input.trim()) {
									sendMessage({ text: input });
									setInput("");
									inputRef.current?.focus();
								}
							}}
							placeholder="Type message..."
							onChange={(e) => setInput(e.target.value)}
							type="text"
							className="w-full bg-black border border-zinc-800 focus:border-zinc-700 focus:outline-none transition-colors text-zinc-100 placeholder:text-zinc-700 py-3 pl-8 pr-4 text-sm"
						/>
					</div>

					<button
						onClick={() => {
							if (input.trim()) {
								sendMessage({ text: input });
								setInput("");
								inputRef.current?.focus();
							}
						}}
						disabled={!input.trim() || isPending}
						className="bg-zinc-800 text-zinc-400 px-6 text-sm font-bold hover:text-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
					>
						SEND
					</button>
				</div>
			</div>
		</main>
	);
};

export default Page;
