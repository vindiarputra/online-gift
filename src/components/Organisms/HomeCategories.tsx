"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";

const CategoryItem = ({
	label,
	description,
	image_url,
	id,
	index,
}: {
	label: string;
	description: string;
	image_url: string;
	id: string;
	index: number;
}) => {
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
					src={image_url}
					alt={label}
					width={600}
					height={400}
					className="rounded-lg object-cover w-full h-[300px] md:h-[400px]"
				/>
			</div>
			<div className="w-full md:w-1/2 space-y-4">
				<h3 className="font-serif text-2xl md:text-3xl font-semibold">{label}</h3>
				<p className="font-sans text-base md:text-lg text-gray-600">{description}</p>
				<motion.div
					className="w-max"
					key={id}
					whileHover={{ x: 5 }}
					transition={{ type: "spring", stiffness: 300 }}>
					<Link
						href={`/category/${id}`}
						className="inline-flex items-center font-sans text-base md:text-lg text-primary hover:text-primary/80 transition-colors ">
						Explore {label}
						<ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default function HomeCategories({
	categories,
}: {
		categories: {
		id: string;
		label: string;
		description: string;
		image_url: string;
	}[];
}) {
	return (
		<section className="w-full py-12 bg-gray-50">
			<div className="container px-4 md:px-6">
				<motion.h2
					className="font-serif text-4xl md:text-5xl font-bold text-center mb-12"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}>
				</motion.h2>
				<div className="space-y-12">
					{categories.map((category, index) => (
						<CategoryItem key={index} {...category} index={index} />
					))}
				</div>
			</div>
		</section>
	);
}
