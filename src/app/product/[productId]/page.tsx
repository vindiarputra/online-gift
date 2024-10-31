"use client";

import { useCart } from "@/context/CartContext";
import { Star, ShoppingCart, Heart, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CardProduct from "@/components/CardProduct";
import { PRODUCTS } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const product = {
	id: "201",
	name: "Complex II by Xavier Creation",
	price: 390000,
	description:
		"Complex II is a Handmade Compact Leather Wallet from Xavier Creation.\nIt has a smaller size and is easy to carry anywhere with various colors made from 100% Genuine Leather (Vegetable Tanned Leather (Natural and Black) and Pull Up Leather (Navy)).\n\nComplex II provides just enough space in a compact size for your essentials.\n\nXavier Creation's products are carefully handcrafted and will only get better with age.\nOvertime the color will become richer, more unique, and full of character.\n\nMaterial : Cow Vegetable Tan\nColour : Natural\n\n3 Card slot\n2 Slot (money / cards)\n1 Hidden slot\n\nDimensions:\n11 cm Width x 7.5 cm Length x 1.5 cm thickness when folded",
	categoryId: "cat002",
	categoryItemId: "item005",
	images: [
		"/images/gift_for_him/dompet_thumbnail.jpg",
		"/images/gift_for_him/dompet_natural.jpg",
		"/images/gift_for_him/dompet_navy.jpg",
	],
	colors: [
		{ name: "Natural", image: "/images/gift_for_him/dompet_natural.jpg", stock: 10 },
		{ name: "Black", image: "/images/gift_for_him/dompet_thumbnail.jpg", stock: 5 },
		{ name: "Navy", image: "/images/gift_for_him/dompet_navy.jpg", stock: 5 },
	],
	stock: 20,
	isFeatured: true,
	onSale: false,
	isNew: true,
	createdAt: "2023-01-01T00:00:00.000Z",
	updatedAt: "2023-01-01T00:00:00.000Z",
};

const FormSchema = z.object({
	color: z.string().min(1, { message: "Please select a color." }),
	quantity: z
		.number()
		.min(1, { message: "Quantity must be at least 1." })
		.max(product.stock, { message: `Maximum quantity is ${product.stock}.` }),
});

export default function DetailProduct() {
	const [currentImage, setCurrentImage] = useState(0);
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);
	const { dispatch } = useCart();
	const { toast } = useToast();
	const router = useRouter()

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			color: product.colors[0].name,
			quantity: 1,
		},
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log(data);
		// dispatch({
		// 	type: "ADD_ITEM",
		// 	item: {
		// 		id: product.id,
		// 		name: product.name,
		// 		price: product.price,
		// 		quantity: data.quantity,
		// 		color: data.color,
		// 	},
		// });
		toast({
			title: "Added to cart",
			description: `${data.quantity} ${product.name} in ${data.color} added to your cart.`,
		});
	};

	return (
		<div className="bg-white pt-2 flex items-center justify-center h-max w-full mt-20 flex-col">
			<div className="max-w-4xl w-full">
				<div className="grid md:grid-cols-2 gap-8">
					{/* Product images section */}
					<div className="space-y-4">
						<div className="border-black border-2 rounded-md overflow-hidden">
							<img
								alt="Product Image"
								className="w-full h-auto object-cover aspect-square"
								height="400"
								src={selectedColor.image}
								width="400"
							/>
						</div>
						{/* Thumbnail images */}
						<div className="grid grid-cols-3 gap-4">
							{product.colors.map((color, i) => (
								<button
									key={i}
									className={`border-black border-2 rounded-md overflow-hidden ${
										color.name === selectedColor.name ? "ring-2 ring-black" : ""
									}`}
									onClick={() => setSelectedColor(color)}>
									<img
										alt={`${color.name} Thumbnail`}
										className="w-full h-auto object-cover aspect-square"
										height="100"
										src={color.image}
										width="100"
									/>
								</button>
							))}
						</div>
					</div>

					{/* Product details section */}
					<div className="space-y-6">
						<div>
							<h1 className="text-3xl font-bold">{product.name}</h1>
							{/* <div className="flex items-center mt-2">
								{[...Array(5)].map((_, i) => (
									<Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
								))}
							</div> */}
						</div>

						<p className="text-xl font-bold">${(product.price / 1000).toFixed(3)}</p>

						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
								<FormField
									control={form.control}
									name="color"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Color</FormLabel>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
													setSelectedColor(
														product.colors.find((c) => c.name === value) || product.colors[0]
													);
												}}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a color" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{product.colors.map((color) => (
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
																Math.min(Math.max(1, value), selectedColor.stock)
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
																Math.min(selectedColor.stock, field.value + 1)
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
									<Button type="submit" className="flex-1" disabled={selectedColor.stock === 0}>
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
			<div className="w-full mt-10 px-32">
				<Carousel>
					<CarouselContent className="p-4">
						{PRODUCTS.map((product) => (
							<CarouselItem
								key={product.id}
								className="md:basis-1/2 lg:basis-1/5"
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
					<CarouselPrevious className="w-12 h-12" />
					<CarouselNext className="w-12 h-12" />
				</Carousel>
			</div>
		</div>
	);
}
