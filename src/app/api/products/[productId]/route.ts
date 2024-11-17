import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";


export async function GET(request: Request, {params}: {params: {productId: string}}) {
	const { data, error } = await supabase.from("products").select().eq("id", params.productId);
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
	return NextResponse.json(data);
}