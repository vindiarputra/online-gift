import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { productId: string } }) {
	try {
		const { data, error } = await supabase.from("products").select("*").eq("id", params.productId).single();
		if (error) throw error;
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error: "Error fetching product:" + error }, { status: 500 });
	}
}
