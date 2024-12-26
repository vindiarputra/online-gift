import { NextResponse } from "next/server";
import { supabase } from "@/lib/utils";

export async function GET() {
	try {
		const { data, error } = await supabase.from("categories").select(`*, bannerId(*)`);
		if (error) {
			throw new Error(error.message);
		}
		if (!data || data.length === 0) {
			return NextResponse.json({ message: "No categories found" }, { status: 404 });
		}
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching categories:", error);
		return NextResponse.json(
			{ message: error instanceof Error ? error.message : "An unexpected error occurred" },
			{ status: 500 }
		);
	}
}
