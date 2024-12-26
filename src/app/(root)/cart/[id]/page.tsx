"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Trash, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";

declare global {
	interface Window {
		snap: any;
	}
}

type CartItem = {
	id: string;
	label: string;
	description: string;
	image: string;
	quantity: number;
	price: number; // In cents
	isFeatured: boolean;
	onSale: boolean;
	isNew: boolean;
	productId: string;
	clerk_id: string;
};

type transaction = {
	clerk_id: string;
	order_id: string;
	gross_amount: number;
	payment_type: string;
	bank: string;
	item: any;
};

export default function CartPage() {
	const router = useRouter();
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const pathname = usePathname().split("/")[2];
	const searchParams = useSearchParams();
	const orderId = searchParams.get("order_id");
	const { user } = useUser();
	const [transaction, setTransaction] = useState<transaction>({
		clerk_id: "",
		order_id: "",
		gross_amount: 0,
		payment_type: "",
		bank: "",
		item: [],
	});
	const [paymentSuccess, setPaymentSuccess] = useState(false);
	const priceFormatted = (price: number) =>
		new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);

	const handleUpdateQuantity = (id: string, newQuantity: number) => {
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
			)
		);
	};

	const handleRemoveItem = async (id: string) => {
		try {
			const res = await fetch(`/api/cart`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				console.error("Failed to delete item:", errorData.error);
				return;
			}
			setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
		} catch (error) {
			console.error("Error deleting item:", error);
		}
	};

	const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	const handleCheckout = async () => {
		try {
			const response = await fetch("/api/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					items: cartItems.map((item) => ({
						id: item.id,
						name: item.label,
						price: item.price,
						quantity: item.quantity,
					})),
				}),
			});
			if (!response.ok) {
				const errorData = await response.json();
				console.error("Checkout failed:", errorData.error);
				return;
			}

			const { token } = await response.json();
			window.snap.pay(token);
		} catch (error) {
			console.error("Error during checkout:", error);
		}
	};

	const checkoutPaymentStatus = async () => {
		if (orderId) {
			try {
				const res = await fetch("/api/token/" + orderId);
				const data = await res.json();
				if (!res.ok) throw new Error("Transaction Failed");
				setTransaction((prevTransaction) => ({
					...prevTransaction,
					order_id: data.order_id,
					gross_amount: data.gross_amount,
					payment_type: data.payment_type,
					bank: data.va_numbers?.[0]?.bank ?? "",
				}));
				setPaymentSuccess(true);
			} catch (error) {
				console.error("Error checking payment status:", error);
			}
		}
	};

	const handlePaymentSuccess = async () => {
		try {
			if (transaction.clerk_id && transaction.item?.length > 0 && transaction.gross_amount) {
				const res = await fetch("/api/transactions", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(transaction),
				});

				if (res.ok) {
					await fetch("/api/cart/" + pathname, {
						method: "DELETE",
					});
					setCartItems([]);
				}
			}
		} catch (error) {
			console.error("Error during checkout:", error);
		}
	};

	

	useEffect(() => {
		const getProductsCart = async () => {
			try {
				const res = await fetch("/api/cart/" + pathname);
				if (!res.ok) throw new Error("Failed to fetch cart items");
				const data = await res.json();
				setCartItems(data);
				setTransaction((prevTransaction) => ({
					...prevTransaction,
					clerk_id: user?.id!!,
					item: data,
				}));
			} catch (error) {
				console.error("Error fetching cart items:", error);
			}
		};
		if (orderId) {
			checkoutPaymentStatus();
		}
		getProductsCart();
	}, [user, orderId, pathname]);



	useEffect(() => {
		if (paymentSuccess) {
			handlePaymentSuccess();
		}
	}, [paymentSuccess, transaction, pathname]);

	useEffect(() => {
		const snapSrc = "https://app.sandbox.midtrans.com/snap/snap.js";
		const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
		const script = document.createElement("script");
		script.src = snapSrc;
		script.setAttribute("data-client-key", clientKey as string);
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<div className="container mx-auto px-4 py-8 min-h-screen h-full flex justify-center items-center mt-14">
			<Card className="w-full max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center">Shopping Cart</CardTitle>
				</CardHeader>
				<CardContent>
					{cartItems.length > 0 ? (
						<div className="space-y-6">
							{cartItems.map((item, index) => (
								<div key={item.id}>
									<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
										<div className="flex items-center space-x-4">
											<Image
												src={item.image}
												alt={item.label}
												width={100}
												height={100}
												className="rounded-md border border-gray-200 "
											/>
											<div>
												<h2
													className="text-lg font-bold cursor-pointer hover:underline"
													onClick={() => router.push(`/product/${item.productId}`)}>
													{item.label}
												</h2>
												<p className="text-sm text-gray-500">{priceFormatted(item.price)}</p>
											</div>
										</div>
										<div className="flex items-center space-x-4">
											<div className="flex items-center space-x-2">
												<Button
													size="icon"
													variant="outline"
													onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
													aria-label={`Decrease quantity of ${item.label}`}>
													<Minus className="h-4 w-4" />
												</Button>
												<span className="font-semibold">{item.quantity}</span>
												<Button
													size="icon"
													variant="outline"
													onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
													aria-label={`Increase quantity of ${item.label}`}>
													<Plus className="h-4 w-4" />
												</Button>
											</div>
											<Button
												variant="destructive"
												size="icon"
												onClick={() => handleRemoveItem(item.id)}
												aria-label={`Remove ${item.label} from cart`}>
												<Trash className="h-4 w-4" />
											</Button>
										</div>
									</div>
									{index < cartItems.length - 1 && <Separator className="my-6" />}
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8">
							<ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
							<p className="mt-4 text-lg text-gray-500">Your cart is empty.</p>
							<Button className="mt-4" onClick={() => router.push("/")}>
								Continue Shopping
							</Button>
						</div>
					)}
				</CardContent>
				{cartItems.length > 0 && (
					<CardFooter className="flex flex-col space-y-4">
						<Separator />
						<div className="flex flex-col sm:flex-row justify-between items-center w-full">
							<div className="text-xl font-bold">Total: {priceFormatted(totalPrice)}</div>
							<div className="flex space-x-4 mt-4 sm:mt-0">
								<Button variant="outline" onClick={() => router.push("/")}>
									Continue Shopping
								</Button>
								<Button onClick={handleCheckout}>Proceed to Checkout</Button>
							</div>
						</div>
					</CardFooter>
				)}
			</Card>
		</div>
	);
}
