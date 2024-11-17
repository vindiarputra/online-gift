"use client";
import { Gift, Menu, ShoppingCart, X } from "lucide-react";
import { useState, useEffect } from "react";
import ProfileDropdown from "../Moleculs/ProfileDropdown";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import SearchBar from "../Moleculs/SearchBar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Navbar() {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
					<div className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
						"Logo"
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:flex space-x-4 justify-center items-center">
						<Dialog open={isOpen} onOpenChange={setIsOpen}>
							<DialogTrigger asChild>
								<Button
									className={`
										group relative overflow-hidden bg-white text-pink-600 hover:text-white
										border-2 border-pink-400 hover:border-pink-600
										transition-all duration-300 ease-in-out
										px-6 py-3 rounded-full text-lg font-semibold
									`}>
									<span className="relative z-10 flex items-center gap-3">
										<Gift className="w-6 h-6" />
										<span>Find Perfect Gifts</span>
									</span>
									<span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
								</Button>
							</DialogTrigger>
							<DialogContent className="w-full max-w-[95vw] max-h-[90vh] overflow-y-auto">
								<SearchBar isOpen={isOpen} setIsOpen={setIsOpen} />
							</DialogContent>
						</Dialog>
						<Button variant="neobrutalism" onClick={() => router.push("/cart")}>
							<ShoppingCart />
						</Button>
						<ProfileDropdown />
					</div>

					{/* Mobile Menu Toggle */}
					<div className="md:hidden flex items-center">
						<Button
							variant="ghost"
							className="text-black"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
							{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				<div
					className={`${
						mobileMenuOpen ? "max-h-screen" : "max-h-0"
					} transition-[max-height] duration-300 ease-in-out overflow-hidden md:hidden`}>
					<div className="flex flex-col items-center space-y-4 mt-4">
						<Dialog open={isOpen} onOpenChange={setIsOpen}>
							<DialogTrigger asChild>
								<Button className="w-full text-pink-600 border-2 border-pink-400 hover:border-pink-600">
									<Gift className="w-6 h-6 mr-2" />
									<span>Find Perfect Gifts</span>
								</Button>
							</DialogTrigger>
							<DialogContent className="w-full max-w-[95vw] max-h-[90vh] overflow-y-auto">
								<SearchBar isOpen={isOpen} setIsOpen={setIsOpen} />
							</DialogContent>
						</Dialog>
						<Button variant="ghost" className="w-full" onClick={() => router.push("/cart")}>
							<ShoppingCart className="mr-2" />
							<span>View Cart</span>
						</Button>
						<ProfileDropdown />
					</div>
				</div>
			</div>
		</nav>
	);
}
