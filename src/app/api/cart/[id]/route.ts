import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const clerk_id = params.id;
    try {
        
        const { data, error } = await supabase.from("cart").select().eq("clerk_id", clerk_id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const clerk_id = params.id;
	try {
		const { error } = await supabase.from("cart").delete().eq("clerk_id", clerk_id);

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
