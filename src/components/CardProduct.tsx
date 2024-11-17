"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductCardProps {
	id: string;
	name: string;
	description: string;
	price: number;
	images: string;
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
	const router = useRouter();

	const priceFormatted = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(price);

	return (
		<div
			className="w-full lg:w-64 bg-white-300 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 transition-all cursor-pointer flex flex-col h-full"
			onClick={() => router.push(`/product/${id}`)}>
			<div className="relative">
				<Image
					src={images}
					alt={name}
					width={400}
					height={200}
					className="w-full h-48 sm:h-56 md:h-64 object-cover border-b-4 border-black"
				/>
				{isNew && (
					<div className="absolute -top-2 -left-2 bg-blue-500 text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold py-1 px-2 sm:px-3 transform -rotate-12 border-2 border-black">
						NEW!
					</div>
				)}
				{onSale && (
					<div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold py-1 px-2 sm:px-3 transform rotate-12 border-2 border-black">
						SALE!
					</div>
				)}
			</div>
			<div className="p-2 sm:p-3 md:p-4 flex flex-col flex-grow">
				<h2 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-1 sm:mb-2 font-mono">
					{name.toUpperCase()}
				</h2>

				<div className="mt-auto">
					<p className="text-base sm:text-lg md:text-xl font-bold font-mono">{priceFormatted}</p>
				</div>
			</div>
		</div>
	);
}
