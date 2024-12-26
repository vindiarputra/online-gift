import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const userId = params.id;
	const { data, error } = await supabase.from("users").select().eq("clerk_id", userId);
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
	return NextResponse.json(data);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	const { user } = await request.json();
	const userId = params.id;
	const { data, error } = await supabase
		.from("users")
		.update({
			name: user.name,
			email: user.email,
			address: user.address,
			postal_code: user.postal_code,
			tlp: user.tlp,
		})
		.eq("clerk_id", userId);
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
	return NextResponse.json(data);
}
