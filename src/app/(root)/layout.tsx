"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Organisms/Navbar";
import Footer from "@/components/Organisms/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
	const { user } = useUser();
	

	useEffect(() => {
		async function syncUser() {
			if (!user?.id) return;

			try {
				const response = await fetch("/api/user", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ userId: user.id }),
				});

				if (!response.ok) {
					throw new Error("Failed to sync user data");
				}
			} catch (error) {
				console.error("Error syncing user data:", error);
			}
		}

		syncUser();
	}, [user?.id]);

	return (
		<CartProvider>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</CartProvider>
	);
}
