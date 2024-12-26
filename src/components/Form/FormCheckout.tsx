"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function FormCheckout() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);
		// Simulate form submission
		setTimeout(() => {
			setIsSubmitting(false);
			alert("Payment processed successfully!");
		}, 2000);
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>Checkout</CardTitle>
				<CardDescription>Please fill in your details to complete your order.</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div className="space-y-2">
							<h3 className="text-lg font-semibold">Personal Information</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="firstName">First Name</Label>
									<Input id="firstName" placeholder="John" required />
								</div>
								<div className="space-y-2">
									<Label htmlFor="lastName">Last Name</Label>
									<Input id="lastName" placeholder="Doe" required />
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" placeholder="john.doe@example.com" required />
							</div>
							<div className="space-y-2">
								<Label htmlFor="phone">Phone Number</Label>
								<Input id="phone" type="tel" placeholder="+1234567890" required />
							</div>
						</div>
						<div className="space-y-2">
							<h3 className="text-lg font-semibold">Shipping Address</h3>
							<div className="space-y-2">
								<Label htmlFor="address">Street Address</Label>
								<Input id="address" placeholder="123 Main St" required />
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="city">City</Label>
									<Input id="city" placeholder="New York" required />
								</div>
								<div className="space-y-2">
									<Label htmlFor="state">State/Province</Label>
									<Input id="state" placeholder="NY" required />
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="zipCode">ZIP/Postal Code</Label>
									<Input id="zipCode" placeholder="10001" required />
								</div>
								<div className="space-y-2">
									<Label htmlFor="country">Country</Label>
									<Select required>
										<SelectTrigger id="country">
											<SelectValue placeholder="Select a country" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="us">United States</SelectItem>
											<SelectItem value="ca">Canada</SelectItem>
											<SelectItem value="uk">United Kingdom</SelectItem>
											{/* Add more countries as needed */}
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter>
				<Button className="w-full" type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Processing Payment..." : "Pay Now"}
				</Button>
			</CardFooter>
		</Card>
	);
}
