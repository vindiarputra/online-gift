import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { categoryId: string } }) {
	const { data, error } = await supabase
		.from("categories")
		.select(`*, bannerId(*)`)
		.eq("id", params.categoryId);
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
	return NextResponse.json(data);
}
