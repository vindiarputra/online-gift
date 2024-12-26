"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart, X } from "lucide-react";

export default function DrawerCart() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<Button variant={"neobrutalism"} className="w-full font-semibold ">
					<ShoppingCart className=" h-4 w-4 " />
					Add to Cart
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Your Cart</DrawerTitle>
						<DrawerDescription>Review your items before checking out.</DrawerDescription>
					</DrawerHeader>
					<div className="p-4">
						<div className="flex items-center justify-between py-4">
							<div className="flex items-center space-x-4">
								<div className="h-16 w-16 bg-gray-100 rounded-md"></div>
								<div>
									<h3 className="font-medium">Sample Product</h3>
									<p className="text-sm text-gray-500">Quantity: 1</p>
								</div>
							</div>
							<p className="font-medium">$19.99</p>
						</div>
						<div className="border-t pt-4">
							<div className="flex items-center justify-between">
								<p className="font-medium">Total</p>
								<p className="font-medium">$19.99</p>
							</div>
						</div>
					</div>
					<DrawerFooter>
						<Button className="w-full">Proceed to Checkout</Button>
						<DrawerClose asChild>
							<Button variant="outline">
								<X className="mr-2 h-4 w-4" />
								Close Cart
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
