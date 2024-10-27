"use client";

import Banners from "@/components/Banners";
import Card from "@/components/Card";
import CardProduct from "@/components/CardProduct";
import Categories from "@/components/Categories";
import Footer from "@/components/Organisms/Footer";
import Banners2 from "@/components/Organisms/Banners2";
import Categories2 from "@/components/Organisms/Categories2";
import CategoryBanner from "@/components/Organisms/CategoryBanner";
import { Comments } from "@/components/Organisms/Comments";
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
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<main className="container mx-auto mt-24 px-4 flex-grow">
				<Banners2 />
				<Categories2 />
				<Comments/>
			</main>
			<Footer />
		</div>
	);
}
