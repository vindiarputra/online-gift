import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "./lib/utils";

const isProtectedRoute = createRouteMatcher(["/profile(.*)"]);

export default clerkMiddleware(async (auth, req) => {
	const { userId, redirectToSignIn } = await auth();
	const currentUrl = new URL(req.url);

	if (currentUrl.pathname.startsWith("/api")) {
		return NextResponse.next();
	}

	if (!userId && isProtectedRoute(req)) {
		return redirectToSignIn();
	}
	
	if (userId) {
		try {
			const { data, error } = await supabase
				.from("users")
				.select("address, postal_code, tlp, name, email")
				.eq("clerk_id", userId)
				.single();

			if (error) throw error;

			// Cek jika data pengguna tidak lengkap
			if (!data || !data.address || !data.postal_code || !data.tlp || !data.name || !data.email) {
				// Hindari redirect jika URL saat ini sudah di "/profile"
				if (currentUrl.pathname === `/profile/${userId}`) {
					return NextResponse.next();
				}

				return NextResponse.redirect(new URL(`/profile/${userId}`, req.url));
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
