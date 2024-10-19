"use client"

import { useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import ProfileDropdown from "./Moleculs/ProfileDropdown";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar() {
	const router = useRouter()

	return (
		<nav className="bg-white p-4 border-b-2 border-black  ">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center">
					<div className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
						"Logo"
					</div>

					<div className="hidden md:flex space-x-4 ">
						<Button variant="neobrutalism" onClick={() => router.push("/cart")}>
							<ShoppingCart/>
						</Button>
						<ProfileDropdown />
					</div>
				</div>
			</div>
		</nav>
	);
}
