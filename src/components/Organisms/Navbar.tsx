"use client";

import {
	GiftIcon,
	Menu,
	ShoppingCart,
	User2,
	Search,
	LogOut,
	UserCircle,
	Settings,
	History,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { TransactionHistory } from "./TransactionHistory";
import SearchProduct from "../Moleculs/SearchProduct";

export default function Navbar() {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const { isSignedIn, user, isLoaded } = useUser();
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const { signOut } = useClerk();
	const pathname = usePathname()

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	return (
		<nav
			className={cn(
				"fixed w-full z-20 transition-all duration-300 ease-in-out top-0",
				isVisible ? "translate-y-0" : "-translate-y-full",
				isSearchOpen ? "bg-white" : "bg-transparent",
				"backdrop-blur-md bg-white/30 "
			)}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					{/* Logo */}
					<Link href="/" className="flex items-center">
						<Image
							src="/images/logo/OG_.svg"
							alt="Logo"
							width={40}
							height={40}
							className="rounded-full"
						/>
						<span className="ml-2 text-sm md:text-lg font-bold text-gray-900">Online Gift</span>
					</Link>

					{/* Search */}
					<div
						className={cn(
							"absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-md transition-all duration-300",
							isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
						)}>
						<Input
							type="search"
							placeholder="Search products..."
							className="w-full max-w-md bg-transparent border-gray-300 focus:border-gray-500 focus:ring-gray-500"
						/>
						<Button
							variant="ghost"
							size="icon"
							className="absolute right-4 text-gray-600 hover:text-gray-900"
							onClick={() => setIsSearchOpen(false)}>
							<Search className="h-4 w-4" />
							<span className="sr-only">Close search</span>
						</Button>
					</div>

					{/* Navigation Items */}
					<div className="flex items-center">
						<SearchProduct />

						{/* Desktop Navigation */}
						<div className="hidden md:flex">
							<Button
								variant="ghost"
								onClick={() => router.push(`/cart/${user?.id}`)}
								className="text-gray-600 hover:text-gray-900 hover:bg-white/50">
								<GiftIcon className="mr-2 h-5 w-5" />
								Box
							</Button>
							<TransactionHistory />
						</div>

						{/* User Menu (Desktop & Mobile) */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="relative rounded-full hover:bg-white/50 ">
									{isSignedIn ? (
										<Avatar className="h-8 w-8">
											<AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
											<AvatarFallback>{user?.fullName?.[0] || "U"}</AvatarFallback>
										</Avatar>
									) : (
										<User2 className="h-5 w-5 text-gray-600 " />
									)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56  backdrop-blur-md">
								{isSignedIn ? (
									<>
										<DropdownMenuLabel>
											<div className="flex flex-col">
												<span className="font-medium">{user?.fullName}</span>
												<span className="text-xs text-gray-500">
													{user?.primaryEmailAddress?.emailAddress}
												</span>
											</div>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={() => router.push(`/profile/${user?.id}`)}>
											<UserCircle className="mr-2 h-4 w-4" />
											Profile
										</DropdownMenuItem>

										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={() => signOut({ redirectUrl: pathname ? pathname : "/" })}
											className="cursor-pointer relative bg-red-500 text-white focus:bg-red-300 focus:text-white">
											<LogOut className="mr-2 h-4 w-4" />
											Log Out
										</DropdownMenuItem>
									</>
								) : (
									<DropdownMenuItem asChild>
										<Button className="w-full" onClick={() => router.push("/sign-in")}>
											<User2 className="mr-2 h-4 w-4" />
											Sign In
										</Button>
									</DropdownMenuItem>
								)}

								{/* Mobile-only navigation items */}
								<div className="md:hidden mt-2">
									<DropdownMenuSeparator />

									<DropdownMenuItem
										onClick={() => router.push(`/cart/${user?.id}`)}
										className="text-gray-600 hover:text-gray-900 px-4">
										<GiftIcon className=" h-5 w-5" />
										Box
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="p-0">
										<TransactionHistory />
									</DropdownMenuItem>
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	);
}
