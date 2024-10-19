"use client"

import { ShoppingCart } from "lucide-react";
import DrawerCart from "./DrawerCart";
import { useRouter } from "next/navigation";

type CardProps= {
	name: string;
	price: number;
	images?: string[];
	productId: string
};


export default function Card({ name, price, images, productId }: CardProps) {
	console.log(images)
	const router = useRouter()
	return (
		<div className="w-full max-w-sm mx-auto cursor-pointer" onClick={() => router.push(`/${productId}`)}>
			<div className="bg-white border-4 border-black p-4 transform rotate-1 hover:-rotate-1 transition-transform duration-300">
				<div className="relative h-48 mb-4">
					<img
						src={images ? images[0] : "https://picsum.photos/200/200"}
						alt={name}
						className="w-full h-full object-cover border-2 border-black"
					/>
					<div className="absolute top-2 right-2 bg-[#A6FAFF] text-black font-bold py-1 px-2 border-2 border-black transform -rotate-3">
						${price}
					</div>
				</div>
				<h3 className="text-xl font-bold mb-2 transform -rotate-1">{name}</h3>
				{/* <DrawerCart /> */}
			</div>
		</div>
	);
}
