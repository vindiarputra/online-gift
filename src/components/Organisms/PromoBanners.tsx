"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Gift, Cake, PartyPopper, Star, Tag, Truck } from "lucide-react";
import Image from "next/image";


const promos = [
	{
		title: "Special 20% Off!",
		description: "Grab our limited-time 20% discount on all items!",
		image: "/images/banner/diskon.png",
		color: "from-purple-500 via-pink-500 to-red-500",
		gradient: "from-pink-300 via-purple-300 to-indigo-300",
		icon: <Tag />,
	},
	{
		title: "Free Shipping!",
		description: "Enjoy free shipping on orders above $50. Limited time offer!",
		image: "/images/banner/truck.png",
		color: "from-blue-500 via-teal-500 to-green-500",
		gradient: "from-blue-300 via-teal-300 to-green-300",
		icon: <Truck />,
	},
	{
		title: "Buy 1 Get 1 Free!",
		description: "Don't miss our exclusive Buy 1 Get 1 Free deal on selected items!",
		image: "/images/banner/free.png",
		color: "from-yellow-500 via-orange-500 to-red-500",
		gradient: "from-yellow-300 via-orange-300 to-red-300",
		icon: <Gift />,
	},

	// {
	// 	title: "Free Shipping Weekend",
	// 	description: "Enjoy free shipping on all orders this weekend only!",
	// 	image: "/images/sumin2.jpg",
	// 	color: "from-yellow-400 via-orange-500 to-red-500",
	// 	gradient: "from-red-200 via-pink-300 to-yellow-200",
	// 	icon: <Gift />,
	// },
	// {
	// 	title: "Buy One Get One Free",
	// 	description: "Celebrate with our BOGO promo on selected items!",
	// 	image: "/images/sas.jpg",
	// 	color: "from-green-400 via-teal-500 to-blue-600",
	// 	gradient: "from-yellow-300 via-orange-300 to-pink-300",
	// 	icon: <Tag />,
	// },
];

export default function PromoBanners() {
	const [currentPromo, setCurrentPromo] = useState(0);
	const [direction, setDirection] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDirection(1);
			setCurrentPromo((prevBanner) => (prevBanner + 1) % promos.length);
		}, 5000);

		return () => clearTimeout(timer);
	}, [currentPromo]);

	const navigate = (newDirection: number) => {
		setDirection(newDirection);
		setCurrentPromo((prevBanner) => (prevBanner + newDirection + promos.length) % promos.length);
	};

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? "100%" : "-100%",
			opacity: 0,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? "100%" : "-100%",
			opacity: 0,
		}),
	};

	return (
		<div className="relative w-full h-[500px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl ">
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
					className={`absolute inset-0 w-full h-full bg-gradient-to-br ${promos[currentPromo].gradient}`}>
					<div className="relative z-10 flex flex-col-reverse md:flex-row h-full">
						<div className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 h-full p-6  md:p-20 text-center md:text-left ">
							<div className="mb-4 p-3 bg-white bg-opacity-80 rounded-full shadow-lg">
								{promos[currentPromo].icon}
							</div>
							<h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-white drop-shadow-lg">
								{promos[currentPromo].title}
							</h2>
							<p className="text-sm md:text-lg lg:text-xl text-white drop-shadow">
								{promos[currentPromo].description}
							</p>
							<button disabled className="mt-4 md:mt-6 px-4 py-2 md:px-6 md:py-2 lg:px-8 lg:py-3 bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-colors duration-300 transform hover:scale-105 shadow-lg">
								Explore Gifts
							</button>
						</div>
						<div className="w-full md:w-1/2 h-full md:h-full relative">
							<Image
								src={promos[currentPromo].image}
								alt={promos[currentPromo].title}
								fill
								style={{ objectFit: "cover" }}
								className="rounded-t-xl md:rounded-none md:rounded-l-3xl"
							/>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>

			<button
				className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-all duration-200 z-10"
				onClick={() => navigate(-1)}
				aria-label="Previous banner">
				<ChevronLeft className="w-6 h-6 text-purple-600" />
			</button>
			<button
				className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-all duration-200 z-10"
				onClick={() => navigate(1)}
				aria-label="Next banner">
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
						aria-label={`Go to banner ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
