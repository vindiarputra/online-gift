import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
	try {
		const { error } = await supabase.from("cart").delete();

		if (error) {
			console.error("Error deleting data from 'cart':", error);
			return NextResponse.json({ error: "Failed to delete items from cart" }, { status: 400 });
		}

		return NextResponse.json({ message: "Items deleted successfully" }, { status: 200 });
	} catch (err) {

		console.error("Unexpected error during DELETE request:", err);
		return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
	}
}
