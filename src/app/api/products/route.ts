import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { data, error } = await supabase.from("products").select();
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
	return NextResponse.json(data);
}
