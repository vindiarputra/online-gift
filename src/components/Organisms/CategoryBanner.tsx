"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Tag, Gift } from "lucide-react";
import Image from "next/image";

const promos = [
	{
		title: "Special 20% Off!",
		description: "Grab our limited-time 20% discount on all items!",
		image: "/images/promo1.jpg",
		color: "from-purple-500 via-pink-500 to-red-500",
		icon: <Tag />,
	},
	{
		title: "Free Shipping Weekend",
		description: "Enjoy free shipping on all orders this weekend only!",
		image: "/images/promo2.jpg",
		color: "from-yellow-400 via-orange-500 to-red-500",
		icon: <Gift />,
	},
	{
		title: "Buy One Get One Free",
		description: "Celebrate with our BOGO promo on selected items!",
		image: "/images/promo3.jpg",
		color: "from-green-400 via-teal-500 to-blue-600",
		icon: <Tag />,
	},
];

export default function CategoryBanner() {
	const [currentPromo, setCurrentPromo] = useState(0);
	const [direction, setDirection] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDirection(1);
			setCurrentPromo((prevPromo) => (prevPromo + 1) % promos.length);
		}, 5000);
		return () => clearTimeout(timer);
	}, [currentPromo]);

	const navigate = (newDirection: number) => {
		setDirection(newDirection);
		setCurrentPromo((prevPromo) => (prevPromo + newDirection + promos.length) % promos.length);
	};

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? "100%" : "-100%",
			opacity: 0,
		}),
		center: { x: 0, opacity: 1 },
		exit: (direction: number) => ({
			x: direction < 0 ? "100%" : "-100%",
			opacity: 0,
		}),
	};

	return (
		<div className="relative w-full h-[400px] overflow-hidden">
			<AnimatePresence initial={false} custom={direction}>
				<motion.div
					key={currentPromo}
					custom={direction}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 },
					}}
					className={`absolute inset-0 w-full h-full bg-gradient-to-r ${promos[currentPromo].color}`}>
					<div className="relative z-10 flex h-full">
						<div className="flex flex-col items-start justify-center w-1/2 h-full p-8 text-left">
							<div className="mb-4 p-3 bg-white rounded-full shadow-lg">
								{promos[currentPromo].icon}
							</div>
							<h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
								{promos[currentPromo].title}
							</h2>
							<p className="text-lg md:text-xl text-white drop-shadow">
								{promos[currentPromo].description}
							</p>
							<button className="mt-6 px-6 py-2 md:px-8 md:py-3 bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-colors duration-300 transform hover:scale-105 shadow-lg">
								Shop Now
							</button>
						</div>
						<div className="w-1/2 h-full relative">
							<Image
								src={promos[currentPromo].image}
								alt={promos[currentPromo].title}
								fill
								style={{ objectFit: "cover" }}
								className="rounded-l-3xl"
							/>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>

			<button
				className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-all duration-200 z-20"
				onClick={() => navigate(-1)}
				aria-label="Previous promo">
				<ChevronLeft className="w-6 h-6 text-purple-600" />
			</button>
			<button
				className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-all duration-200 z-20"
				onClick={() => navigate(1)}
				aria-label="Next promo">
				<ChevronRight className="w-6 h-6 text-purple-600" />
			</button>

			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
				{promos.map((_, index) => (
					<button
						key={index}
						className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ${
							index === currentPromo ? "bg-white w-6" : "bg-white bg-opacity-50"
						}`}
						onClick={() => setCurrentPromo(index)}
						aria-label={`Go to promo ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
