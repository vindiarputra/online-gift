"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";

const CategoryItem = ({ category, index }: { category: any; index: number }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.5 });
	const controls = useAnimation();

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [isInView, controls]);

	const variants = {
		hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
	};

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={controls}
			variants={variants}
			className={`flex flex-col ${
				index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
			} gap-8 items-center`}>
			<div className="w-full md:w-1/2">
				<Image
					src={category.image}
					alt={category.name}
					width={600}
					height={400}
					className="rounded-lg object-cover w-full h-[300px] md:h-[400px]"
				/>
			</div>
			<div className="w-full md:w-1/2 space-y-4">
				<h3 className="font-serif text-2xl md:text-3xl font-semibold">{category.name}</h3>
				<p className="font-sans text-base md:text-lg text-gray-600">{category.description}</p>
				<motion.div
					key={category.name}
					whileHover={{ x: 5 }}
					transition={{ type: "spring", stiffness: 300 }}>
					<Link
						href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
						className="inline-flex items-center font-sans text-base md:text-lg text-primary hover:text-primary/80 transition-colors">
						Explore {category.name}
						<ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default function Categories2() {
	const categories = [
		{
			name: "Birthday Gifts",
			description:
				"Celebrate another year with our curated selection of birthday presents, perfect for all ages and personalities.",
			image: "/images/sumin.jpg",
		},
		{
			name: "Anniversary Gifts",
			description:
				"Mark your special day with thoughtful anniversary gifts that symbolize your love and commitment.",
			image: "/images/sumin2.jpg",
		},
		{
			name: "Wedding Gifts",
			description:
				"Help newlyweds start their journey with our elegant wedding gift collection, from practical to luxurious.",
			image: "/images/sas.jpg",
		},
		{
			name: "Holiday Gifts",
			description:
				"Spread joy during the festive season with our holiday-themed presents, suitable for all your loved ones.",
			image: "/images/sumin.jpg",
		},
		{
			name: "Corporate Gifts",
			description:
				"Impress clients and colleagues with our professional corporate gift options that make a lasting impression.",
			image: "/images/sas.jpg",
		},
		{
			name: "Personalized Gifts",
			description:
				"Add a personal touch with our customizable gift selections, creating unique and memorable presents.",
			image: "/images/sumin2.jpg",
		},
	];

	return (
		<section className="w-full py-12 bg-gray-50">
			<div className="container px-4 md:px-6">
				<motion.h2
					className="font-serif text-4xl md:text-5xl font-bold text-center mb-12"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}>
					Online Gift Categories
				</motion.h2>
				<div className="space-y-12">
					{categories.map((category, index) => (
						<CategoryItem key={index} category={category} index={index} />
					))}
				</div>
			</div>
		</section>
	);
}
