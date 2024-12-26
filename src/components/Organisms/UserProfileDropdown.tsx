"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

interface UserProfileDropdownProps {
    user: {
        id: string;
		name: string;
		email: string;
		avatarUrl?: string;
	};
}

export default function UserProfileDropdown({ user }: UserProfileDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { signOut } = useClerk();

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-10 w-10 rounded-full">
					<Avatar className="h-10 w-10">
						<AvatarImage src={user.avatarUrl} alt={user.name} />
						<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-1 leading-none">
						<p className="font-medium">{user.name}</p>
						<p className="text-sm text-muted-foreground">{user.email}</p>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
                    <Link href={"/profile/" + user.id } className="cursor-pointer">
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
					</Link>
				</DropdownMenuItem>
				{/* <DropdownMenuItem asChild>
					<Link href="/settings" className="cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/help" className="cursor-pointer">
						<HelpCircle className="mr-2 h-4 w-4" />
						<span>Help</span>
					</Link>
				</DropdownMenuItem> */}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer text-red-600 focus:text-red-600"
					onClick={() => signOut({ redirectUrl: "/sign-in" })}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
