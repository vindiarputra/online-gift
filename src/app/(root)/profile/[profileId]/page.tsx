"use client";

import { Metadata } from "next";
import ProfileForm from "./profile-form";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
	const userId = usePathname().split("/")[2];
	const [user, setUser] = useState({
		name: "",
		email: "",
		imageUrl: "",
		postal_code: 0,
		address: "",
		tlp: 0,
	});
	useEffect(() => {
		async function fetchUserData() {
			try {
				if (!userId) {
					throw new Error("User ID not found in the URL");
				}

				const res = await fetch(`/api/user/${userId}`);
				if (!res.ok) {
					throw new Error("Failed to fetch user data");
				}
				const userData = await res.json();
				setUser({
					name: userData[0].name || "",
					email: userData[0].email || "",
					imageUrl: userData[0].imageUrl || "",
					postal_code: userData[0].postal_code || 0,
					address: userData[0].address || "",
					tlp: userData[0].tlp || 0,
				});
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}
		fetchUserData();

	}, []);
	console.log(user);
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">Your Profile</h1>
			<div className="bg-card rounded-lg shadow p-6">
				<ProfileForm user={user} />
			</div>
		</div>
	);
}
