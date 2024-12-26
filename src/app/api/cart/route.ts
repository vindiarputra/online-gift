import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const {
		id,
		label,
		price,
		quantity,
		description,
		isNew,
		onSale,
		isFeatured,
		images_url,
		clerk_id,
	} = await request.json();
	const { data, error } = await supabase.from("cart").insert([
		{
			label,
			price,
			quantity,
			description,
			isNew,
			onSale,
			isFeatured,
			image: images_url,
			productId: id,
			clerk_id,
		},
	]);
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
	return NextResponse.json({ message: "Success" }, { status: 200 });
}

export async function DELETE(request: Request) {
	try {
		const body = await request.json();
		const { id } = body;

		if (!id) {
			return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
		}
		const { error } = await supabase.from("cart").delete().eq("id", id);

		if (error) {
			return NextResponse.json({ error: "Failed to delete cart product" }, { status: 400 });
		}

		return NextResponse.json({ message: "Product cart deleted successfully" }, { status: 200 });
	} catch (err) {
		console.error("Error handling DELETE request:", err);
		return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
	}
}

export async function PATCH(request: Request) {
	const { id, quantity } = await request.json();
	const { data, error } = await supabase.from("cart").update({ quantity }).eq("id", id);
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
	return NextResponse.json({ message: "Success" }, { status: 200 });
}
