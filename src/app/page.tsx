"use client";

import Banners from "@/components/Banners";
import Card from "@/components/Card";
import CardProduct from "@/components/CardProduct";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import { products } from "@/lib/data";
import { useState } from "react";

export default function Page() {
	const [isPurchaseHistoryOpen, setIsPurchaseHistoryOpen] = useState(false);

	const featuredProducts = products.filter((product) => product.isFeatured === true);
	const nonFeaturedProducts = products.filter((product) => product.isFeatured === false);

	// const featuredProducts = [
	// 	{ title: "Personalized Mug", price: 15.99, image: "https://picsum.photos/200/200?random=1" },
	// 	{ title: "Engraved Necklace", price: 49.99, image: "https://picsum.photos/200/200?random=2" },
	// 	{ title: "Photo Frame", price: 25.99, image: "https://picsum.photos/200/200?random=3" },
	// ];

	// const nonFeaturedProducts = [
	// 	{ title: "Custom T-shirt", price: 19.99, image: "https://picsum.photos/200/200?random=4" },
	// 	{ title: "Gift Box Set", price: 59.99, image: "https://picsum.photos/200/200?random=5" },
	// 	{ title: "Monogrammed Towel", price: 29.99, image: "https://picsum.photos/200/200?random=6" },
	// 	{ title: "Candles Set", price: 15.99, image: "https://picsum.photos/200/200?random=7" },
	// ];

	return (
		<div className="min-h-screen bg-white flex flex-col">
			<main className="container mx-auto mt-8 px-4 flex-grow">
				<Banners />
				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="md:col-span-full">
						<Categories />
					</div>
					<div className="md:col-span-4">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-3xl font-bold transform -rotate-1">Featured Products</h2>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{featuredProducts.map((product) => (
								<CardProduct key={product.id} {...product} />
							))}
						</div>
					</div>
					<div className="md:col-span-2 lg:col-span-3">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-3xl font-bold transform -rotate-1">Anniversary</h2>
						</div>
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
							{nonFeaturedProducts.map((product) => (
								<CardProduct key={product.id} {...product} />
							))}
						</div>
					</div>
				</div>
			</main>
			<Footer />;
		</div>
	);
}
