import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Organisms/Navbar";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Organisms/Footer";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const revalidate = 0;

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Online Gift Store | Perfect Gifts for Every Occasion",
	description:
		"Discover a wide range of unique and thoughtful gifts for every occasion. Shop online for personalized gifts, gift cards, and more. Make every moment memorable.",
};


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				layout: {
					unsafe_disableDevelopmentModeWarnings: true,
				},
				elements: {
					header: {
						display: "none",
					},
					footer: {
						display: "none",
					},
				},
			}}>
			<html lang="en">
				<body className={`${geistSans.variable} ${geistMono.variable}  antialiased`}>
					{children}
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
