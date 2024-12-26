"use client";

import { useState, useCallback } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

// Product type definition and products array remain unchanged
type Product = {
	id: string;
	created_at: string;
	label: string;
	description: string;
	isFeatured: boolean;
	isNew: boolean;
	onSale: boolean;
	price: number;
	stock: number;
	images_url: { url: string }[];
	categoryId: string
};

const products: Product[] = [
	{
		id: "32b5ec6a-dd2a-4c1b-9ee3-4a0b2540f746",
		created_at: "2024-11-13T12:23:12.766797+00:00",
		label: "Rolex GMT Master 1675",
		description:
			"A remarkably rare and stunning stainless steel double signed Rolex GMT Master, reference 1675, from 1978, showcasing a beautifully patinated and vivid fuchsia bezel.\nIts matte black dial and cream-colored luminous hour markers elevate the design, attracting a world of travelers.\nIt is finished with a stainless steel oyster bracelet and folding clasp.\nThis watch is engraved with two names on the caseback. It is possible to remove upon request.\n\nReference Number: 1675\nModel: GMT Master\nMovement: Automatic\nCase Material: Stainless Steel\nBracelet Material: Stainless Steel\nDial: Matte Black\nCase Diameter: 40mm\nYear: 1978\nCondition: Vintage\nBox and Papers: No original box, no original papers\n\n100% Authenticity Guarantee",
		isFeatured: true,
		isNew: false,
		onSale: false,
		price: 1113165,
		stock: 20,
		images_url: [
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731500573/fnc8cwxtrlpkyqwuchss.png",
			},
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731500573/yrfaelrucdndk6lvz2ty.png",
			},
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731500573/dfciowqcclpt6kc8iuvj.png",
			},
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731500573/hro0ms0txjo1zjguthbz.png",
			},
		],
		categoryId: "cb00e861-ad82-49c7-a03d-9c994b04d463",
	},
	{
		id: "bd0bb54e-7eac-4f4b-9681-cf04ab6e36cc",
		created_at: "2024-11-13T12:38:22.463984+00:00",
		label: "GENTLEMAN GIVENCHY EAU DE PARFUM",
		description:
			"Gentleman Givenchy Eau de Parfum, a new intensity for men who dance to their own beat. An elegant woody-floral Oriental reminiscent of nightfall, composed with an explosive signature. A floral played out in masculine notes.\n\nFragrance Family: Woody Floral Oriental",
		isFeatured: true,
		isNew: false,
		onSale: false,
		price: 1142776,
		stock: 5,
		images_url: [
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731501387/cfob0ntlzwiltb8zebvr.webp",
			},
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731501387/wbxg1hy86ggwgat6fwtm.webp",
			},
		],
		categoryId: "cb00e861-ad82-49c7-a03d-9c994b04d463",
	},
	{
		id: "f5ced4a5-561e-4d9e-a17c-62a3e2de735c",
		created_at: "2024-11-13T12:55:04.901909+00:00",
		label: "Classic Black Dad Cap",
		description:
			"This classic black dad cap is made from 100% cotton canvas, ensuring durability and comfort. With a 6-panel design and a low-profile fit, it provides a sleek and modern look. The adjustable strap at the back allows for a customizable fit, making it suitable for various head sizes. Its simple and timeless design makes it a versatile accessory that pairs well with any outfit.",
		isFeatured: false,
		isNew: true,
		onSale: false,
		price: 251390,
		stock: 10,
		images_url: [
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731502496/vhiptk0ufe3ov7azjmev.jpg",
			},
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731502496/t6lg3yqmnugdgy7bx2ky.jpg",
			},
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731502497/eegppm0hukxoou9qqirg.jpg",
			},
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731502497/upyzboeqevrkjfxfgamb.jpg",
			},
		],
		categoryId: "cb00e861-ad82-49c7-a03d-9c994b04d463",
	},
	{
		id: "9f5ec5cc-1d7b-45d5-97d1-803632dbb5a8",
		created_at: "2024-11-13T13:02:17.695054+00:00",
		label: "Touchscreen Winter Gloves",
		description:
			"Stay warm and connected with these stylish touchscreen winter gloves. Made from high-quality, soft material, these gloves are designed to keep your hands cozy while allowing you to use your devices seamlessly. The fingertips feature sensitive touchscreen-compatible fabric, enabling precise control without removing your gloves. The non-slip grip on the palms enhances control, making these gloves perfect for outdoor activities like running, cycling, or driving in cold weather. Ideal for both men and women, these gloves combine functionality with style.",
		isFeatured: true,
		isNew: false,
		onSale: false,
		price: 314254,
		stock: 10,
		images_url: [
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731502927/cszj3ysji7inoi3zwj7i.jpg",
			},
		],
		categoryId: "cb00e861-ad82-49c7-a03d-9c994b04d463",
	},
	{
		id: "6b925f34-aea2-45d8-b343-1c14ff35a7b4",
		created_at: "2024-11-13T13:16:58.065256+00:00",
		label: "90's Baby Dad Hat Baseball Cap",
		description:
			"100% bio-washed chino twill Unstructured, six-panel, low-profile Pre-curved visor Self-fabric tri-glide buckle closure. Printed with high quality vinyl\n",
		isFeatured: true,
		isNew: false,
		onSale: false,
		price: 440470,
		stock: 10,
		images_url: [
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731503798/nbi6jozbnfnxvpgvo4nr.jpg",
			},
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731503813/om3bpxm2gggzh8jmoihz.jpg",
			},
		],
		categoryId: "68ab841e-23f3-45cb-a8be-fc478c0525cf",
	},
	{
		id: "9244dbed-a488-4795-8b9d-db98ea990b91",
		created_at: "2024-11-13T13:10:54.377546+00:00",
		label: "Furry Monster Keychain Doll",
		description:
			"Add a touch of whimsy to your day with this adorable furry monster keychain doll. Dressed in a soft, fluffy costume with cute bunny ears and a mischievous expression, this keychain is perfect for fans of quirky collectibles. Its compact size makes it ideal for hanging on your bag, keys, or even as a unique desk companion. Made with high-quality materials, this keychain doll is both durable and eye-catching—a fun accessory for anyone who loves playful designs.",
		isFeatured: false,
		isNew: false,
		onSale: true,
		price: 729000,
		stock: 20,
		images_url: [
			{
				url: "https://res.cloudinary.com/dtatajpiw/image/upload/v1731503440/z221phluqqvhcjnvdesm.webp",
			},
		],
		categoryId: "68ab841e-23f3-45cb-a8be-fc478c0525cf",
	},
];
export default function SearchBar({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(products);

	const priceFormatted = (price: number) =>
		new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);

	const placeholders = [
		"Search for watches...",
		"Find perfumes...",
		"Look for accessories...",
		"Discover new arrivals...",
		"Explore featured items...",
	];

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);

		const filtered = products.filter(
			(product) =>
				product.label.toLowerCase().includes(value.toLowerCase()) ||
				product.description.toLowerCase().includes(value.toLowerCase())
		);
		setFilteredProducts(filtered);
	}, []);

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			console.log("Search submitted:", searchTerm);
		},
		[searchTerm]
	);

	return (
		<div className="w-full p-4">
			<div className="w-max mx-auto">
				<PlaceholdersAndVanishInput
					placeholders={placeholders}
					onChange={handleChange}
					onSubmit={onSubmit}
				/>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
				{filteredProducts.map((product) => (
					<Link
						href={`/product/${product.id}`}
						key={product.id}
						className="no-underline"
						onClick={() => setIsOpen(false)} // Tutup dialog saat link diklik
					>
						<Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
							<CardHeader className="p-3">
								<div className="aspect-square relative mb-2">
									<Image
										src={product.images_url[0].url}
										alt={product.label}
										layout="fill"
										objectFit="cover"
										className="rounded-md"
									/>
								</div>
								<CardTitle className="text-sm font-medium line-clamp-1">{product.label}</CardTitle>
							</CardHeader>
							<CardContent className="flex-grow p-3 pt-0">
								<CardDescription className="text-xs line-clamp-2 mb-2">
									{product.description}
								</CardDescription>
								<div className="flex justify-between items-center text-sm">
									<span className="font-bold">{priceFormatted(product.price)}</span>
									<span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
								</div>
							</CardContent>
							<CardFooter className="flex flex-wrap gap-1 p-3 pt-0">
								{product.isFeatured && (
									<Badge variant="secondary" className="text-xs">
										Featured
									</Badge>
								)}
								{product.isNew && (
									<Badge variant="secondary" className="text-xs">
										New
									</Badge>
								)}
								{product.onSale && (
									<Badge variant="destructive" className="text-xs">
										On Sale
									</Badge>
								)}
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}

