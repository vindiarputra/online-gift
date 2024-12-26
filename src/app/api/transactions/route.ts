import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { clerk_id, gross_amount, payment_type, bank, item } = await request.json();

    const { data, error } = await supabase.from("transactions").insert([{
        clerk_id,
        gross_amount : Number(gross_amount),
        payment_type,
        bank,
        item
    }]);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data);
}