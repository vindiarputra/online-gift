"use client"

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Banners() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const banners = [
		{ title: "Summer Sale", description: "Get 50% off on all items" },
		{ title: "New Collection", description: "Check out our latest arrivals" },
		{ title: "Free Shipping", description: "On orders over $100" },
	];

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % banners.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
	};

	useEffect(() => {
		const timer = setInterval(nextSlide, 5000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="relative w-full h-64 md:h-96 overflow-hidden border-4 border-black">
			{banners.map((banner, index) => (
				<div
					key={index}
					className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
						index === currentSlide ? "translate-x-0" : "translate-x-full"
					}`}
					style={{
						transform: `translateX(${(index - currentSlide) * 100}%)`,
						backgroundColor: ["#A6FAFF", "#79F7FF", "#00E1EF"][index % 3],
					}}>
					<div className="flex flex-col items-center justify-center h-full p-4 text-center">
						<h2 className="text-3xl md:text-5xl font-bold mb-4 transform -rotate-2">
							{banner.title}
						</h2>
						<p className="text-xl md:text-2xl transform rotate-1">{banner.description}</p>
					</div>
				</div>
			))}
			<button
				onClick={prevSlide}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 border-black border-2 p-2.5 bg-white hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-full transition-all duration-200"
				aria-label="Previous slide">
				<ChevronLeft size={24} />
			</button>
			<button
				onClick={nextSlide}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 border-black border-2 p-2.5 bg-white hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-full transition-all duration-200"
				aria-label="Next slide">
				<ChevronRight size={24} />
			</button>
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{banners.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`w-4 h-4 rounded-full border-2 border-black transition-all duration-200 ${
							index === currentSlide ? "bg-[#00E1EF]" : "bg-white"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
