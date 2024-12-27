import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const { data, error } = await supabase
		.from("transactions")
		.select(
			`
            *,
            clerk_id(*)
        `
		)
		.eq("clerk_id", params.id);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
	return NextResponse.json(data);
}
