"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePathname, useRouter } from "next/navigation";

const profileSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	address: z.string().min(5, {
		message: "Address must be at least 5 characters.",
	}),
	postal_code: z.number().refine((val) => val.toString().length >= 5, {
		message: "Postal code must be at least 5 characters.",
	}),
	tlp: z.number().refine((val) => val.toString().length >= 8, {
		message: "Telephone must be at least 8 characters.",
	}),
	imageUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface User {
	id: string;
	name: string;
	email: string;
	imageUrl: string;
	postal_code: number;
	address: string;
	tlp: number;
}

interface ProfileFormProps {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function ProfileForm({ user, setUser }: ProfileFormProps) {
	const [isEditing, setIsEditing] = useState(false);
	const pathname = usePathname().split("/")[2];
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const { toast } = useToast();
	const router = useRouter()

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: user.name,
			email: user.email,
			address: user.address,
			postal_code: user.postal_code ? user.postal_code : 0,
			tlp: user.tlp ? user.tlp : 0,
			imageUrl: user.imageUrl,
		},
	});

	async function onSubmit(data: ProfileFormValues) {
		try {
			const res = await fetch(`/api/user/${pathname}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ user: data }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Failed to update profile");
			}

			const updatedUser = await res.json();

			// Check if updatedUser is an array and has at least one element
			if (Array.isArray(updatedUser) && updatedUser.length > 0) {
				setUser(updatedUser[0]);
			} else if (typeof updatedUser === "object" && updatedUser !== null) {
				// If it's a single object, use it directly
				setUser(updatedUser);
			}

			toast({
				title: "Profile updated",
				description: "Your profile has been updated successfully.",
			});

			setIsEditing(false);
		} catch (error) {
			toast({
				title: "Update failed",
				description:
					error instanceof Error
						? error.message
						: "An unexpected error occurred. Please try again later.",
				variant: "destructive",
			});
		}
	}

	const handleCancelEdit = () => {
		if (form.formState.isDirty) {
			setShowConfirmDialog(true);
		} else {
			setIsEditing(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
					<Avatar className="h-24 w-24">
						<AvatarImage src={user.imageUrl} alt={user.name} />
						<AvatarFallback>{user.name ? user.name.charAt(0) : "U"}</AvatarFallback>
					</Avatar>
					<div className="text-center md:text-left self-center">
						<h2 className="text-2xl font-bold">{user.name}</h2>
						<p className="text-muted-foreground">{user.email}</p>
					</div>
				</div>

				{isEditing ? (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="name"
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
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter your email" disabled />
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
											<Input
												{...field}
												placeholder="Enter your postal code"
												type="number"
												onChange={(e) => {
													const value = e.target.value;
													field.onChange(value ? Number(value) : value);
												}}
											/>
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
											<div className="flex">
												<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
													+62
												</span>
												<Input
													{...field}
													placeholder="Enter your telephone number"
													type="number"
													onChange={(e) => {
														const value = e.target.value;
														field.onChange(value ? Number(value) : value);
													}}
												/>
											</div>
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
							<Button type="button" variant="outline" onClick={handleCancelEdit}>
								Cancel
							</Button>
							<Button type="submit">Save Changes</Button>
						</div>
					</>
				) : (
					<>
						<div className="space-y-4 p-4 bg-card shadow rounded-md">
							<div className="flex items-center space-x-2">
								<strong className="text-foreground">Address:</strong>
								<span className="text-muted-foreground">{user.address}</span>
							</div>
							<div className="flex items-center space-x-2">
								<strong className="text-foreground">Postal Code:</strong>
								<span className="text-muted-foreground">{user.postal_code}</span>
							</div>
							<div className="flex items-center space-x-2">
								<strong className="text-foreground">Telephone:</strong>
								<span className="text-muted-foreground">{user.tlp}</span>
							</div>
						</div>

						<div className="flex space-x-4">
							<Button type="button" onClick={() => window.history.back()} variant="outline">
								Back
							</Button>
							<Button type="button" onClick={() => setIsEditing(true)}>
								Edit Profile
							</Button>
						</div>
					</>
				)}
			</form>

			<AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Discard changes?</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to discard your changes? This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								form.reset();
								setIsEditing(false);
								setShowConfirmDialog(false);
							}}>
							Discard
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Form>
	);
}
