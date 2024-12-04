import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	const { userId } = await auth();

	return (
		<div className="flex min-h-screen bg-background flex-col lg:flex-row">
			<div className="relative w-full lg:w-1/2">
				<img
					className="absolute inset-0 object-cover w-full h-full opacity-50 lg:opacity-100"
					src="images/auth/bg-image.jpg"
					alt="Gift background"
				/>
				<div className="absolute inset-0 bg-black/60" />
				<div className="hidden absolute inset-0 lg:flex items-center justify-center">
					<div className="text-white text-center px-4">
						<h1 className="text-3xl lg:text-4xl font-bold mb-4">Welcome to Our Gift Shop</h1>
						<p className="text-lg lg:text-xl">
							Find the perfect gift for any occasion and make someone smile
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-between w-full lg:w-1/2 p-6 lg:p-8">
				<div className="flex justify-between items-center mb-8">
					<Link href="/">
						<div className="flex items-center space-x-2">
							<img src="images/logo/logo.svg" alt="Logo" className="w-1/2 md:w-1/4 lg:w-1/2 xl:w-1/4" />
						</div>
					</Link>
					{!userId && (
						<div className="flex space-x-4 lg:pr-8">
							<Button variant="ghost" asChild>
								<Link href="/sign-in">Sign In</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href="/sign-up">Sign Up</Link>
							</Button>
						</div>
					)}
				</div>

				<div className="flex-grow flex items-center justify-center md:-mt-8 lg:-mt-20">
					<div className="w-full max-w-sm">
						<div className="mb-8 text-center">
							<h2 className="text-2xl lg:text-3xl font-bold text-foreground">
								{userId ? "Welcome Back!" : "Start Your Gift Shopping"}
							</h2>
							<p className="mt-2 text-muted-foreground text-sm lg:text-base">
								{userId
									? "Manage your gifts and orders"
									: "Create an account or sign in to explore unique gifts"}
							</p>
						</div>
						{children}
					</div>
				</div>

				<div className="text-center text-sm text-muted-foreground mt-4">
					&copy; {new Date().getFullYear()} Online Gift. All rights reserved.
				</div>
			</div>
		</div>
	);
}
