import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";

// Define types for better type safety
type Item = {
	id: string;
	price: number;
	quantity: number;
	name: string;
	clerk_id: string;
};

type RequestBody = {
	items: Item[];
};

// Initialize Midtrans Snap outside of the handler function
const snap = new Midtrans.Snap({
	isProduction: process.env.NODE_ENV === "production",
	serverKey: process.env.MIDTRANS_SERVER_KEY,
	clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export async function POST(request: Request) {
	// Validate environment variables
	if (!process.env.MIDTRANS_SERVER_KEY || !process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY) {
		console.error("Midtrans environment variables are not set");
		return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
	}

	try {
		const { items }: RequestBody = await request.json();

		const transactionDetails = items.map((item: Item) => ({
			id: item.id,
			price: item.price,
			quantity: item.quantity,
			name: item.name,
			clerk_id: item.clerk_id,
		}));

		const grossAmount = transactionDetails.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);

		const params = {
			transaction_details: {
				order_id: `ORDER-${Date.now()}`,
				gross_amount: grossAmount,
			},
			item_details: transactionDetails,
		};

		const transaction = await snap.createTransaction(params);

		return NextResponse.json({
			token: transaction.token,
		});
	} catch (error) {
		console.error("Error generating Midtrans token:", error);
		return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
	}
}
