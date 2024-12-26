"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, Plus, Minus, GiftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import CardProduct from "@/components/CardProduct";
import Autoplay from "embla-carousel-autoplay";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

interface Product {
	id: string;
	created_at: string;
	label: string;
	description: string;
	isFeatured: boolean;
	isNew: boolean;
	onSale: boolean;
	price: number;
	stock: number;
	images_url: {
		url: string;
	}[];
	categoryId: string;
}

export default function ProductDetail({
	product,
	relatedProducts,
}: {
	product: Product;
	relatedProducts: Product[];
}) {
	const [quantity, setQuantity] = useState(1);
    const { isSignedIn, user, isLoaded } = useUser();
	const [selectedImage, setSelectedImage] = useState(product.images_url[0]?.url);
	const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
	const router = useRouter();
	const { toast } = useToast();

	const handleQuantityChange = (newQuantity: number) => {
		setQuantity(Math.max(1, Math.min(newQuantity, product.stock)));
    };

	const handleAddTocart = async () => {
		if (!isSignedIn) {
			return router.push("/sign-in");
        }
        


		try {
			const dataToCart = {
				...product,
				quantity,
				images_url: product.images_url[0]?.url,
				clerk_id: user?.id,
			};

			const res = await fetch("/api/cart", {
				method: "POST",
				body: JSON.stringify(dataToCart),
			});

			if (res.status === 200) {
				toast({
					title: "Success",
					description: "Product added to Box",
					className: "bg-green-500 text-white",
				});
				return;
			}
			toast({
				title: "Error",
				description: "Failed add to cart",
				variant: "destructive",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Something Went Wrong",
				variant: "destructive",
			});
			return;
		}
    };

	return (
		<div className="container mx-auto px-4 py-8 mt-24">
			<div className="grid md:grid-cols-2 gap-8">
				<div className="space-y-4">
					{/* Main Preview Image */}
					<Card className="overflow-hidden">
						<CardContent className="p-0">
							<div className="relative aspect-square">
								<Image
									src={selectedImage}
									alt={product.label}
									className="object-cover object-center"
									fill
									priority
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							</div>
						</CardContent>
					</Card>

					{/* Thumbnail Images */}
					<div className="grid grid-cols-4 gap-4">
						{product.images_url.map((image, index) => (
							<button
								key={index}
								onClick={() => setSelectedImage(image.url)}
								className={cn(
									"relative aspect-square overflow-hidden rounded-lg bg-gray-100 border-2",
									selectedImage === image.url
										? "border-primary ring-2 ring-primary"
										: "border-gray-200 hover:border-gray-300"
								)}>
								<Image
									src={image.url}
									alt={`${product.label} thumbnail ${index + 1}`}
									className="object-cover object-center"
									fill
									sizes="(max-width: 768px) 25vw, 20vw"
								/>
							</button>
						))}
					</div>
				</div>

				<div className="space-y-6">
					<h1 className="text-3xl font-bold">{product.label}</h1>
					<p className="text-xl font-semibold">
						{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
							product.price
						)}
					</p>
					<div className="flex items-center space-x-2">
						{product.isFeatured && <Badge>Featured</Badge>}
						{product.isNew && <Badge variant="secondary">New</Badge>}
						{product.onSale && <Badge variant="destructive">On Sale</Badge>}
					</div>
					<p className="text-gray-600 whitespace-pre-line">{product.description}</p>
					<div className="flex items-center space-x-4">
						<Button
							onClick={() => handleQuantityChange(quantity - 1)}
							variant="outline"
							size="icon"
							aria-label="Decrease quantity">
							<Minus className="h-4 w-4" />
						</Button>
						<span className="text-xl font-semibold">{quantity}</span>
						<Button
							onClick={() => handleQuantityChange(quantity + 1)}
							variant="outline"
							size="icon"
							aria-label="Increase quantity">
							<Plus className="h-4 w-4" />
						</Button>
					</div>
					<div className="flex space-x-4">
						<Button className="flex-1" onClick={handleAddTocart}>
							Add to Box
							<GiftIcon className="w-5 h-5 ml-2" />
						</Button>
						<Button variant="outline" aria-label="Add to favorites">
							<Heart className="w-5 h-5" />
						</Button>
					</div>
				</div>
			</div>

			<div className="w-full mb-16">
				<div>
					<h2 className="text-3xl font-bold mt-12 mb-4">You May Also Like</h2>
				</div>
				<Carousel plugins={[plugin.current]} className="w-full" onMouseLeave={plugin.current.reset}>
					<CarouselContent className="my-16 mx-4">
						{relatedProducts.map((relatedProduct) => (
							<CarouselItem
								key={relatedProduct.id}
								className="basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 select-none w-56"
								onClick={() => router.push(`/product/${relatedProduct.id}`)}>
								<CardProduct
									key={relatedProduct.id}
									id={relatedProduct.id}
									name={relatedProduct.label}
									description={relatedProduct.description}
									price={relatedProduct.price}
									images={relatedProduct.images_url[0]?.url}
									isNew={relatedProduct.isNew}
									onSale={relatedProduct.onSale}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="w-12 h-12 absolute left-0" />
					<CarouselNext className="w-12 h-12 absolute right-0" />
				</Carousel>
			</div>
		</div>
	);
}
