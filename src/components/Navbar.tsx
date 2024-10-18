"use client"

import { useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        <ShoppingCart   />,
        <User   />,
    ];

	const NavButton = ({ children, rounded = "" }) => (
		<button
			className={`h-12  border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] ${rounded} transition-all duration-200`}>
			{children}
		</button>
	);

	return (
		<nav className="bg-white p-4 border-b-2 border-black  ">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center">
					<div className="text-2xl font-bold">
						<NavButton>LOGO</NavButton>
					</div>
					<div className="hidden md:flex space-x-4 ">
						{navItems.map((item, index) => (
							<NavButton
								key={index}
								rounded={index === navItems.length - 1 ? "rounded-full" : "rounded-md"}>
								{item}
							</NavButton>
						))}
					</div>
					<div className="md:hidden">
						<NavButton rounded="rounded-md" onClick={() => setIsMenuOpen(!isMenuOpen)}>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</NavButton>
					</div>
				</div>
			</div>
			{isMenuOpen && (
				<div className="md:hidden mt-4 space-y-2">
					{navItems.map((item, index) => (
						<NavButton
							key={item}
							rounded={index === navItems.length - 1 ? "rounded-full" : "rounded-md"}>
							{item}
						</NavButton>
					))}
				</div>
			)}
		</nav>
	);
}
