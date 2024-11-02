"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShoppingCart, Heart, Plus, Minus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import { PRODUCTS } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CardProduct from "@/components/CardProduct";
import Autoplay from "embla-carousel-autoplay";

export default function ProductDetail() {
	const currentPath = usePathname();
	const [product, setProduct] = useState<any>(null);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
	const router = useRouter()

	useEffect(() => {
		const productId = currentPath.split("/").pop();
		const foundProduct = PRODUCTS.find((p) => p.id === productId);
		setProduct(foundProduct || null);
		setSelectedImage(foundProduct?.images[0] || null);
	}, [currentPath]);

	const FormSchema = z.object({
		quantity: z
			.number()
			.min(1, { message: "Quantity must be at least 1." })
			.max(product?.stock || 1, { message: `Maximum quantity is ${product?.stock || 1}.` }),
		color: z.string().min(1, { message: "Please select a color." }).optional(),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			quantity: 1,
		},
	});

	const priceFormatted = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(product?.price);

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
	}

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div className="bg-white pt-2 flex items-center justify-center h-max w-full mt-20 flex-col">
			<div className="max-w-4xl w-full px-4 lg:px-0">
				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-4">
						<div className="border-black border-2 rounded-md overflow-hidden">
							<img
								alt="Product Image"
								className="w-full h-auto object-cover aspect-square"
								height="400"
								src={selectedImage || product.images[0]}
								width="400"
							/>
						</div>
						{product.images.length > 1 && (
							<div className="grid grid-cols-4 gap-4">
								{product.images.map((image: string, i: number) => (
									<button
										key={i}
										className={`border-black border-2 rounded-md overflow-hidden ${
											image === selectedImage ? "ring-2 ring-black" : ""
										}`}
										onClick={() => setSelectedImage(image)}>
										<img
											alt={`Product Thumbnail ${i + 1}`}
											className="w-full h-auto object-cover aspect-square"
											height="100"
											src={image}
											width="100"
										/>
									</button>
								))}
							</div>
						)}
					</div>

					<div className="space-y-6">
						<div>
							<h1 className="text-3xl font-bold">{product.name}</h1>
						</div>

						<p className="text-xl font-bold">{priceFormatted}</p>

						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
								{product.colors && product.colors.length > 0 && (
									<FormField
										control={form.control}
										name="color"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Color</FormLabel>
												<Select
													onValueChange={(value) => {
														field.onChange(value);
														const selectedColor = product.colors.find((c: any) => c.name === value);
														setSelectedImage(selectedColor?.image || product.images[0]);
													}}
													value={field.value}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select a color" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{product.colors.map((color: any) => (
															<SelectItem key={color.name} value={color.name}>
																<div className="flex items-center justify-between w-full gap-4">
																	<span>{color.name}</span>
																	<Badge variant={color.stock > 0 ? "default" : "destructive"}>
																		{color.stock > 0 ? `${color.stock} in stock` : "Out of stock"}
																	</Badge>
																</div>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}

								<FormField
									control={form.control}
									name="quantity"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Quantity</FormLabel>
											<FormControl>
												<div className="flex items-center border-black border-2 rounded-md overflow-hidden w-[45%]">
													<Button
														type="button"
														variant="outline"
														size="icon"
														onClick={() => form.setValue("quantity", Math.max(1, field.value - 1))}>
														<Minus className="h-4 w-4" />
													</Button>
													<Input
														type="number"
														{...field}
														onChange={(e) => {
															const value = parseInt(e.target.value) || 1;
															form.setValue(
																"quantity",
																Math.min(Math.max(1, value), product.stock || 1)
															);
														}}
														className="border-x-2 border-black text-center"
													/>
													<Button
														type="button"
														variant="outline"
														size="icon"
														onClick={() =>
															form.setValue(
																"quantity",
																Math.min(product.stock || 1, field.value + 1)
															)
														}>
														<Plus className="h-4 w-4" />
													</Button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex space-x-4">
									<Button type="submit" className="flex-1" disabled={product.stock === 0}>
										<ShoppingCart className="w-5 h-5 mr-2" />
										Add to Cart
									</Button>
									<Button type="button" variant="outline">
										<Heart className="w-5 h-5" />
									</Button>
								</div>
							</form>
						</Form>
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="details">
								<AccordionTrigger>Product Details</AccordionTrigger>
								<AccordionContent>
									<p className="text-gray-600 whitespace-pre-line">{product.description}</p>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</div>
			<Separator className="my-8" />

			<h1 className="font-semibold text-2xl place-self-start pl-16 text-gray-800">
				You May also like
			</h1>
			<div className="w-full  md:px-32 mb-16">
				<Carousel plugins={[plugin.current]} className="w-full" onMouseLeave={plugin.current.reset}>
					<CarouselContent className="my-16 mx-4">
						{PRODUCTS.map((product) => (
							<CarouselItem
								key={product.id}
								className="basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 select-none w-56"
								onClick={() => router.push(`/product/${product.id}`)}>
								<CardProduct
									key={product.id}
									id={product.id}
									name={product.name}
									description={product.description}
									price={product.price}
									images={product.images}
									isNew={product.isNew}
									onSale={product.onSale}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="w-12 h-12 absolute left-0 " />
					<CarouselNext className="w-12 h-12 absolute right-0 " />
				</Carousel>
			</div>
		</div>
	);
}
