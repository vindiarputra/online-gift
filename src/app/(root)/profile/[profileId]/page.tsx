"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import ProfileForm from "./profile-form";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";



interface User {
	id: string;
	name: string;
	email: string;
	imageUrl: string;
	postal_code: number;
	address: string;
	tlp: number;
}

export default function ProfilePage() {
	const pathname = usePathname().split("/")[2];
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUserData() {
			try {
				if (!pathname) {
					throw new Error("User ID not found in the URL");
				}

				const res = await fetch(`/api/user/${pathname}`);
				if (!res.ok) {
					throw new Error("Failed to fetch user data");
				}
				const userData = await res.json();
				setUser(userData[0]);
			} catch (error) {
				console.error("Error fetching user data:", error);
				setError(error instanceof Error ? error.message : "An unexpected error occurred");
			} finally {
				setLoading(false);
			}
		}
		fetchUserData();
	}, [pathname]);

	if (loading) {
		return (
			<div className="container mx-auto py-10">
				<Skeleton className="h-12 w-[250px] mb-6" />
				<div className="bg-card rounded-lg shadow p-6">
					<Skeleton className="h-[400px] w-full" />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto py-10">
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="container mx-auto py-10">
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>User not found</AlertDescription>
				</Alert>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">Your Profile</h1>
			<div className="bg-card rounded-lg shadow p-6">
				<ProfileForm user={user} setUser={setUser} />
			</div>
		</div>
	);
}
