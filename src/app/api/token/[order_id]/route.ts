import { NextResponse } from "next/server";

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_API_URL = "https://api.sandbox.midtrans.com/v2";

if (!MIDTRANS_SERVER_KEY) {
	throw new Error("MIDTRANS_SERVER_KEY is not set in environment variables");
}

export async function GET(req: Request, { params }: { params: { order_id: string } }) {
	const orderId = params.order_id;
	console.log(`Received order: ${orderId}`);

	const url = `${MIDTRANS_API_URL}/${orderId}/status`;

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Basic ${Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString("base64")}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error("Midtrans API error:", errorData);
			return NextResponse.json(
				{ message: "Error fetching order status" },
				{ status: response.status }
			);
		}

		const data: any = await response.json();
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.error("Error fetching Midtrans status:", error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
