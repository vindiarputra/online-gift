"use client";


import Footer from "@/components/Organisms/Footer";
import { Comments } from "@/components/Organisms/Comments";
import CategoryBanners from "@/components/Organisms/CategoryBanners";
import HomeCategories from "@/components/Organisms/HomeCategories";

export default function Page() {

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<main className="container mx-auto  px-4 flex-grow mt-24">
				<CategoryBanners />
				<HomeCategories />
				<Comments />
			</main>
			<Footer />
		</div>
	);
}
