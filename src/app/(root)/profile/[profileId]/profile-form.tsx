"use client";

import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";

const profileSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z
		.string()
		.email({
			message: "Please enter a valid email address.",
		})
		.optional(),
	address: z.string().min(5, {
		message: "Address must be at least 5 characters.",
	}),
	postal_code: z
		.string()
		.regex(/^\d+$/, {
			message: "Postal code must contain only numbers.",
		})
		.transform((val) => Number(val)), // Konversi ke number
	tlp: z
		.string()
		.regex(/^\d+$/, {
			message: "Telephone must contain only numbers.",
		})
		.transform((val) => Number(val)), // Konversi ke number
	imageUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm({ user }: { user: any }) {
	const userId = usePathname().split("/")[2];

	const defaultValues = {
		name: user.name,
		email: user.email,
	};
	const [isEditing, setIsEditing] = useState(false);
	const { toast } = useToast();
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
	});

	async function onSubmit(data: ProfileFormValues) {
		try {
			const res = await fetch(`/api/user/${userId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ user: data }), // Bungkus dalam objek `user`
			});

			if (!res.ok) {
				toast({
					title: "Update failed",
					description: "There was an error updating your profile. Please try again.",
					variant: "destructive",
				});
				return;
			}

			toast({
				title: "Profile updated",
				description: "Your profile has been updated successfully.",
			});
			setIsEditing(false);
		} catch (error) {
			toast({
				title: "Update failed",
				description: "An unexpected error occurred. Please try again later.",
				variant: "destructive",
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
					<Avatar className="h-24 w-24">
						<AvatarImage src={user.imageUrl} alt={user.name} />
						<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="text-center md:text-left self-center">
						<h2 className="text-2xl font-bold">{user.name}</h2>
						<p className="text-muted-foreground">{user.email}</p>
					</div>
				</div>

				{isEditing ? (
					<>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="name"
								defaultValue={defaultValues.name}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter your name" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								defaultValue={user.email}
								disabled
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter your email" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="postal_code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Postal Code</FormLabel>
										<FormControl>
											<Input {...field} type="number" placeholder="Enter your postal code" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tlp"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Telephone</FormLabel>
										<FormControl>
											<Input {...field} type="number" placeholder="Enter your telephone number" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder="Enter your address" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end space-x-4">
							<Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
								Cancel
							</Button>
							<Button type="submit">Save Changes</Button>
						</div>
					</>
				) : (
					<>
						<div className="space-y-4 p-4 bg-white shadow rounded-md">
							<div className="flex items-center space-x-2">
								<strong className="text-gray-700">Address:</strong>
								<span className="text-gray-600">{user.address}</span>
							</div>
							<div className="flex items-center space-x-2">
								<strong className="text-gray-700">Postal Code:</strong>
								<span className="text-gray-600">{user.postal_code}</span>
							</div>
							<div className="flex items-center space-x-2">
								<strong className="text-gray-700">Telephone:</strong>
								<span className="text-gray-600">{user.tlp}</span>
							</div>
						</div>

						<div className="flex space-x-4">
							<Button
								type="button"
								onClick={() => window.history.back()}
								className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded shadow">
								Cancel
							</Button>
							<Button type="button" onClick={() => setIsEditing(true)}>
								Edit Profile
							</Button>
						</div>
					</>
				)}
			</form>
		</Form>
	);
}
