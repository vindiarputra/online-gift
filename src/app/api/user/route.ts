import { supabase } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


// Sync user clerk to Supabase
export async function POST(request: Request) {
    const { userId } = await request.json();
	// Sync user to Supabase
	try {
		const { data: existingUser } = await supabase
			.from("users")
			.select("clerk_id")
			.eq("clerk_id", userId)
			.single();

		if (!existingUser) {
			const client = await clerkClient();
			const user = await client.users.getUser(userId);
			await supabase.from("users").insert({
				clerk_id: user.id,
				email: user.emailAddresses[0]?.emailAddress,
                name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
                imageUrl: user.imageUrl,

			});
		}
	} catch (error) {
		console.error("Error syncing user:", error);
	}

	return NextResponse.json({ message: "User synced successfully" }, { status: 200 });
}
