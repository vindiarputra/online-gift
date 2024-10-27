"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import ProfileDropdown from "../Moleculs/ProfileDropdown";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Navbar() {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

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
			className={`bg-white p-4 border-b-2 border-black fixed w-full z-20 transition-transform duration-300 ease-in-out ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			}`}>
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center">
					<div className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
						"Logo"
					</div>

					<div className="hidden md:flex space-x-4 justify-center items-center">
						<Button variant="neobrutalism" onClick={() => router.push("/cart")}>
							<ShoppingCart />
						</Button>
						<ProfileDropdown />
					</div>
				</div>
			</div>
		</nav>
	);
}
