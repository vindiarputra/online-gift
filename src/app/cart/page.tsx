// "use client";

// import { useCart } from "@/context/CartContext";
// import { Trash, Plus, Minus, ShoppingBag } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// export default function CartPage() {
// 	const { state, dispatch } = useCart();
// 	const { items } = state;
// 	const router = useRouter();

// 	const handleRemoveItem = (id: string) => {
// 		dispatch({
// 			type: "REMOVE_ITEM",
// 			id,
// 		});
// 	};

// 	const handleUpdateQuantity = (id: string, quantity: number) => {
// 		dispatch({
// 			type: "ADD_ITEM",
// 			quantity,
// 		});
// 	};

// 	const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

// 	return (
// 		<div className="container mx-auto px-4 py-8">
// 			<Card className="max-w-4xl mx-auto">
// 				<CardHeader>
// 					<CardTitle className="text-3xl font-bold text-center">Shopping Cart</CardTitle>
// 				</CardHeader>
// 				<CardContent>
// 					{items.length > 0 ? (
// 						<div className="space-y-6">
// 							{items.map((item, index) => (
// 								<div key={item.id}>
// 									<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
// 										<div className="flex items-center space-x-4">
// 											<Image
// 												src={`https://picsum.photos/seed/${item.id}/100/100`}
// 												alt={item.name}
// 												width={64}
// 												height={64}
// 												className="rounded-md border border-gray-200"
// 											/>
// 											<div>
// 												<h2
// 													className="text-lg font-bold cursor-pointer hover:underline"
// 													onClick={() => router.push(`/product/${item.id}`)}>
// 													{item.name}
// 												</h2>
// 												<p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
// 											</div>
// 										</div>
// 										<div className="flex items-center space-x-4">
// 											<div className="flex items-center space-x-2">
// 												<Button
// 													size="icon"
// 													variant="outline"
// 													onClick={() =>
// 														handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
// 													}
// 													aria-label={`Decrease quantity of ${item.name}`}>
// 													<Minus className="h-4 w-4" />
// 												</Button>
// 												<span className="font-semibold">{item.quantity}</span>
// 												<Button
// 													size="icon"
// 													variant="outline"
// 													onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
// 													aria-label={`Increase quantity of ${item.name}`}>
// 													<Plus className="h-4 w-4" />
// 												</Button>
// 											</div>
// 											<Button
// 												variant="destructive"
// 												size="icon"
// 												onClick={() => handleRemoveItem(item.id)}
// 												aria-label={`Remove ${item.name} from cart`}>
// 												<Trash className="h-4 w-4" />
// 											</Button>
// 										</div>
// 									</div>
// 									{index < items.length - 1 && <Separator className="my-6" />}
// 								</div>
// 							))}
// 						</div>
// 					) : (
// 						<div className="text-center py-8">
// 							<ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
// 							<p className="mt-4 text-lg text-gray-500">Your cart is empty.</p>
// 							<Button className="mt-4" onClick={() => router.push("/")}>
// 								Continue Shopping
// 							</Button>
// 						</div>
// 					)}
// 				</CardContent>
// 				{items.length > 0 && (
// 					<CardFooter className="flex flex-col space-y-4">
// 						<Separator />
// 						<div className="flex flex-col sm:flex-row justify-between items-center w-full">
// 							<div className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</div>
// 							<div className="flex space-x-4 mt-4 sm:mt-0">
// 								<Button variant="outline" onClick={() => router.push("/")}>
// 									Continue Shopping
// 								</Button>
// 								<Button onClick={() => router.push("/checkout")}>Proceed to Checkout</Button>
// 							</div>
// 						</div>
// 					</CardFooter>
// 				)}
// 			</Card>
// 		</div>
// 	);
// }

import React from 'react'

const page = () => {
  return (
	<div>
	  ini Cart
	</div>
  )
}

export default page

