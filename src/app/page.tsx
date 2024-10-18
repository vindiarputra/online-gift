"use client";

import Banners from "@/components/Banners";
import Card from "@/components/Card";
import Categories from "@/components/Categories";
import DrawerHistory from "@/components/DrawerHistory";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function Page() {
	const [isPurchaseHistoryOpen, setIsPurchaseHistoryOpen] = useState(false);

	const featuredProducts = [
		{ title: "Cool T-Shirt", price: 29.99, image: "/placeholder.svg?height=200&width=200" },
		{ title: "Awesome Sneakers", price: 89.99, image: "/placeholder.svg?height=200&width=200" },
		{ title: "Stylish Watch", price: 129.99, image: "/placeholder.svg?height=200&width=200" },
	];

	return (
		<div className="min-h-screen bg-white flex flex-col">
			<Navbar />
			<main className="container mx-auto mt-8 px-4 flex-grow">
				<Banners />
				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="md:col-span-1">
						<Categories />
					</div>
					<div className="md:col-span-2">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-3xl font-bold transform -rotate-1">Featured Products</h2>
							<button
								onClick={() => setIsPurchaseHistoryOpen(true)}
								className="flex items-center p-2 bg-[#A6FAFF] border-2 border-black hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] transition-all duration-200">
								<ShoppingBag size={24} className="mr-2" />
								Purchase History
							</button>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{featuredProducts.map((product, index) => (
								<Card key={index} {...product} />
							))}
						</div>
					</div>
				</div>
			</main>
			<Footer />
			<DrawerHistory
				isOpen={isPurchaseHistoryOpen}
				onClose={() => setIsPurchaseHistoryOpen(false)}
			/>
			;
		</div>
	);
}
