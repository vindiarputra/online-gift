"use client";

import { useEffect, useState } from "react";
import { Search, SearchIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "../ui/input";

// Mock product data type
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
	categoryId: string;
};

// Helper untuk memformat harga
const priceFormatted = (price: number) =>
	new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(price);

export default function SearchProduct() {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState<Product[]>([]);

	const fetchProducts = async () => {
		try {
			const res = await fetch("/api/products");
			if (!res.ok) throw new Error("Gagal mengambil data produk");
			const data = await res.json();
			setProducts(data);
		} catch (error) {
			console.error(error);
		}
	};

	// Filter produk berdasarkan kata kunci pencarian
	const filteredProducts = products.filter((product) =>
		product.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-white/50 ">
					<Search className="mr-2 h-4 w-4" />
					Search Products
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-screen max-w-screen-lg overflow-y-scroll px-4 sm:px-6">
				<DialogHeader>
					<DialogTitle>Search Products</DialogTitle>
				</DialogHeader>
				<div className="relative">
					<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
					<Input
						placeholder="Search products..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-10"
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
					{filteredProducts.map((product) => (
						<Link
							href={`/product/${product.id}`}
							key={product.id}
							className="no-underline"
							onClick={() => setIsOpen(false)}>
							<Card className="flex flex-col h-full w-full hover:shadow-lg transition-shadow duration-300">
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
									<CardTitle className="text-sm font-medium line-clamp-1">
										{product.label}
									</CardTitle>
								</CardHeader>
								<CardContent className="flex-grow p-3 pt-0">
									<p className="text-xs line-clamp-2 mb-2">{product.description}</p>
									<div className="flex justify-between items-center text-sm">
										<span className="font-bold">{priceFormatted(product.price)}</span>
										<span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
									</div>
								</CardContent>
								<div className="flex flex-wrap gap-1 p-3 pt-0">
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
								</div>
							</Card>
						</Link>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
