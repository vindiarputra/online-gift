"use client";

import { useCart } from "@/context/CartContext";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CartPage() {
	const { state, dispatch } = useCart();
    const { items } = state;
    const router = useRouter()
    
    console.log(state)

	// Fungsi untuk menghapus item dari cart
	const handleRemoveItem = (id: string) => {
		dispatch({
			type: "REMOVE_ITEM",
			id,
		});
	};

	// Hitung total harga
	const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

	return (
		<div className=" bg-white flex items-center justify-center p-6">
			<div className="max-w-4xl w-full border-black border-2 p-6 rounded-md">
				<h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
				{items.length > 0 ? (
					<div className="space-y-4">
						{items.map((item) => (
							<div
								key={item.id}
								className="flex justify-between items-center border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md">
								<div className="flex items-center space-x-4">
									<img
										src={`https://picsum.photos/seed/${item.id}/100/100`}
										alt={item.name}
										className="w-16 h-16 border-black border-2 rounded-md"
									/>
									<div>
										<h2 className="text-lg font-bold cursor-pointer" onClick={() => router.push("/productId")}>{item.name}</h2>
										<p className="text-sm">Quantity: {item.quantity}</p>
										<p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
									</div>
								</div>
								<div>
									<Button
										className="bg-red-500 hover:bg-red-600 text-white flex items-center space-x-2 rounded-md border-black border-2 p-2.5"
										onClick={() => handleRemoveItem(item.id)}>
										<Trash className="w-4 h-4" />
										<span>Remove</span>
									</Button>
								</div>
							</div>
						))}

						{/* Total Price */}
						<div className="flex justify-between items-center border-black border-2 p-2.5  rounded-md">
							<h3 className="text-xl font-bold">Total</h3>
							<p className="text-lg font-semibold">${totalPrice.toFixed(2)}</p>
						</div>

						{/* Checkout Button */}
						<div className="text-right">
							<Button className="border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md">
								Proceed to Checkout
							</Button>
						</div>
					</div>
				) : (
					<p className="text-center text-gray-500">Your cart is empty.</p>
				)}
			</div>
		</div>
	);
}
