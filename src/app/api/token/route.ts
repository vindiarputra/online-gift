import Midtrans from "midtrans-client";
import { NextRequest, NextResponse } from "next/server";

let snap = new Midtrans.Snap({
	isProduction: false,
	serverKey: process.env.MIDTRANS_SERVER_KEY,
	clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});


export async function POST(request: Request) {
	const { items } = await request.json();
	const transactionDetails = items.map(
		(item: { id: any; price: any; quantity: any; name: any, clerk_id: any }) => ({
			id: item.id,
			price: item.price,
			quantity: item.quantity,
			name: item.name,
			clerk_id: item.clerk_id
		})
	);

	const grossAmount = transactionDetails.reduce(
		(sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
		0
	);

	let params = {
		transaction_details: {
			order_id: `ORDER-${Date.now()}`, // Generate unique order ID
            gross_amount: grossAmount,
		},
		item_details: transactionDetails,
	};

	try {
		const transaction = await snap.createTransaction(params);
		return NextResponse.json({
			token: transaction.token,
		});
	} catch (error) {
		return NextResponse.json({ error: "failed generate token" }, { status: 500 });
	}
}
