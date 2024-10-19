"use client";

import { useRouter } from "next/navigation";

interface ProductCardProps {
	id: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	isNew?: boolean;
	onSale?: boolean;
}

export default function CardProduct({
	id,
	name,
	description,
	price,
	images,
	isNew,
	onSale,
}: ProductCardProps) {
    const router = useRouter()

	return (
		<div className="w-full max-w-md bg-white-300 border-4 border-black hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all cursor-pointer" onClick={() => router.push(`/${id}`)}>
			<div className="relative">
				<img src={images.length > 0 ? images[0] : ""} alt={name} className="w-full h-48 object-cover border-b-4 border-black" />
				{isNew && (
					<div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xl font-bold py-1 px-3 transform -rotate-12 border-2 border-black">
						NEW!
					</div>
				)}
				{onSale && (
					<div className="absolute -top-2 -right-2 bg-red-500 text-white text-xl font-bold py-1 px-3 transform rotate-12 border-2 border-black">
						SALE!
					</div>
				)}
			</div>
			<div className="p-4">
				<h2 className="text-2xl font-extrabold mb-2 font-mono">{name.toUpperCase()}</h2>
				<p className="text-lg mb-4 font-mono">{description}</p>
				<div className="flex justify-between items-center">
					<p className="text-3xl font-bold font-mono">${price.toFixed(2)}</p>
				</div>
			</div>
		</div>
	);
}
