"use client";

import { GiftIcon, Menu, ShoppingCart, User2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import SearchProduct from "../Moleculs/SearchProduct";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import UserProfileDropdown from "./UserProfileDropdown";
import { TransactionHistory } from "./TransactionHistory";

export default function Navbar() {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const { isSignedIn, user, isLoaded } = useUser();
	const profile = {
		id: user?.id || "",
		name: user?.fullName || "",
		email: user?.primaryEmailAddress?.emailAddress || "",
		avatarUrl: user?.imageUrl || "",
	};
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
			className={`bg-white p-4 border-b-2 border-black fixed w-full z-20 transition-transform duration-300 ease-in-out top-0 ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			}`}>
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center">
					{/* Logo */}

					<div className="flex items-center" onClick={() => router.push("/")}>
						<Image src="/images/logo/OG_.svg" alt="Logo" width={60} height={50} />
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:flex space-x-4 justify-center items-center">
						<SearchProduct />
						<Button
							className="relative bg-[#8BB4F7] hover:bg-[#8BB4F7] text-black border-2 border-black
             shadow-[0_4px_0_0_#000] transition-all duration-300
             active:top-[2px] active:shadow-none"
							onClick={() => router.push("/cart/" + user?.id)}>
							<GiftIcon />
						</Button>
						<TransactionHistory />

						<div className="w-10 flex items-center">
							{!isSignedIn ? (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<div
											className="flex h-10 w-10 rounded-full bg-[#8BB4F7] hover:bg-[#8BB4F7] text-black border-2 border-black
             shadow-[0_4px_0_0_#000] transition-all duration-300
             active:top-[2px] active:shadow-none justify-center items-center">
											<User2 />
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-56 bg-white border-2 border-black p-2">
										<DropdownMenuItem asChild>
											<Button
												className="w-full bg-[#8BB4F7] hover:bg-[#8BB4F7] text-black border-2 border-black
                     shadow-[0_4px_0_0_#000] transition-all duration-300
                     active:top-[2px] active:shadow-none my-2 cursor-pointer"
												onClick={() => router.push("/sign-in")}>
												<User2 className="mr-2" /> Sign In
											</Button>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<UserProfileDropdown user={profile} />
							)}
						</div>
					</div>

					{/* Mobile Menu (Dropdown) */}

					<div className="md:hidden space-x-4">
						<SearchProduct />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className="relative bg-[#8BB4F7] hover:bg-[#8BB4F7] text-black border-2 border-black
                 shadow-[0_4px_0_0_#000] transition-all duration-300
                 active:top-[2px] active:shadow-none">
									<Menu />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56 bg-white border-2 border-black p-2">
								{!isSignedIn ? (
									<DropdownMenuItem asChild>
										<Button
											className="w-full bg-[#8BB4F7] hover:bg-[#8BB4F7] text-black border-2 border-black
                     shadow-[0_4px_0_0_#000] transition-all duration-300
                     active:top-[2px] active:shadow-none my-2"
											onClick={() => router.push("/sign-in")}>
											<User2 className="mr-2" /> Sign In
										</Button>
									</DropdownMenuItem>
								) : (
									<DropdownMenuItem>
										<div className="flex justify-center w-full my-2">
											<UserButton
												appearance={{
													elements: {
														userButtonAvatarBox: "w-10 h-10",
													},
												}}
											/>
										</div>
									</DropdownMenuItem>
								)}
								<DropdownMenuItem asChild>
									<Button
										className="w-full bg-[#8BB4F7] hover:bg-[#8BB4F7] text-black border-2 border-black
                   shadow-[0_4px_0_0_#000] transition-all duration-300
                   active:top-[2px] active:shadow-none my-2"
										onClick={() => router.push("/cart/" + user?.id)}>
										<GiftIcon className="mr-2" /> Cart
									</Button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	);
}
