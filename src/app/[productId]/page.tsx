"use client";

import { useCart } from "@/context/CartContext";
import { products } from "@/lib/data";
import { Star, ShoppingCart, Heart, Plus, Minus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DetailProduct() {
	const [quantity, setQuantity] = useState(1);
	const [currentImage, setCurrentImage] = useState(0);
	const { state, dispatch } = useCart();

	const path = usePathname();

    const currentPath = path.split("/")[path.split("/").length - 1];
    
    const currentProduct = products.find((product) => product.id === currentPath);
    console.log(currentProduct)

	// Data produk sementara, nanti bisa diganti dengan data dari API atau props
	const product = {
		id: "1",
		name: "Neo Brutalist Desk Lamp",
		price: 129.99,
		description: "Embrace the raw aesthetic of neo-brutalism with our uniquely designed desk lamp.",
		reviews: 42,
	};

	// Fungsi untuk menambah item ke cart
	const handleAddToCart = () => {
		dispatch({
			type: "ADD_ITEM",
			item: { id: product.id, name: product.name, price: product.price, quantity },
		});
	};
	console.log(state);
	// Fungsi untuk menambah dan mengurangi quantity
	const incrementQuantity = () => setQuantity((prev) => prev + 1);
	const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

	// Gambar produk
	const images = [
		"https://picsum.photos/200/200?random=1",
		"https://picsum.photos/200/200?random=2",
		"https://picsum.photos/200/200?random=3",
		"https://picsum.photos/100/100?random=4",
	];

	return (
		<div className="bg-white pt-2 flex items-center justify-center">
			<div className="max-w-4xl w-full">
				<div className="grid md:grid-cols-2 gap-8">
					{/* Bagian gambar produk */}
					<div className="space-y-4">
						<div className="border-black border-2 rounded-md overflow-hidden">
							<img
								alt="Product Image"
								className="w-full h-auto object-cover aspect-square"
								height="400"
								src={currentProduct?.images[currentImage]}
								width="400"
							/>
						</div>
						{/* Thumbnail gambar */}
						<div className="grid grid-cols-4 gap-4">
							{currentProduct?.images.map((img, i) => (
								<button
									key={i}
									className={`border-black border-2 rounded-md overflow-hidden ${
										i === currentImage ? "ring-2 ring-black" : ""
									}`}
									onClick={() => setCurrentImage(i)}>
									<img
										alt={`Thumbnail ${i + 1}`}
										className="w-full h-auto object-cover aspect-square"
										height="100"
										src={img}
										width="100"
									/>
								</button>
							))}
						</div>
					</div>

					{/* Bagian detail produk */}
					<div className="space-y-6">
						<div>
							<h1 className="text-3xl font-bold">{currentProduct?.name}</h1>
							<div className="flex items-center mt-2">
								{[...Array(5)].map((_, i) => (
									<Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
								))}
								<span className="ml-2 text-sm text-gray-600">({product.reviews} reviews)</span>
							</div>
						</div>

						<p className="text-xl font-bold">${currentProduct?.price.toFixed(2)}</p>

						<p className="text-gray-600">{currentProduct?.description}</p>

						<div className="space-y-4">
							<div>
								<label htmlFor="color" className="block text-sm font-medium text-gray-700">
									Color
								</label>
								<select
									id="color"
									className="mt-1 block w-full border-black border-2 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black">
									<option>Concrete Gray</option>
									<option>Industrial Black</option>
									<option>Raw Steel</option>
								</select>
							</div>

							{/* Quantity Selector */}
							<div>
								<label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
									Quantity
								</label>
								<div className="mt-1 flex items-center border-black border-2 rounded-md overflow-hidden">
									<button
										onClick={decrementQuantity}
										className="p-2 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black">
										<Minus className="w-5 h-5" />
									</button>
									<input
										type="number"
										id="quantity"
										min="1"
										value={quantity}
										onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
										className="w-full text-center border-x-2 border-black py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black"
									/>
									<button
										onClick={incrementQuantity}
										className="p-2 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black">
										<Plus className="w-5 h-5" />
									</button>
								</div>
							</div>
						</div>

						{/* Add to Cart dan Favorite Buttons */}
						<div className="flex space-x-4">
							<button
								onClick={handleAddToCart}
								className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black flex items-center justify-center">
								<ShoppingCart className="w-5 h-5 mr-2" />
								Add to Cart
							</button>
							<button className="border-black border-2 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
								<Heart className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
