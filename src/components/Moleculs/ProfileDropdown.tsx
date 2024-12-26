"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, HelpCircle, LogOut, ShoppingBag } from "lucide-react";
import DrawerHistory from "../DrawerHistory";
import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useClerk } from "@clerk/nextjs";

export default function ProfileDropdown() {
	const [isPurchaseHistoryOpen, setIsPurchaseHistoryOpen] = useState(false);
	const { signOut } = useClerk();
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="neobrutalism" className="relative h-10 w-10 rounded-full ">
						<Avatar className="h-auto w-auto">
							<AvatarImage src="/avatars/01.png" alt="@johndoe" />
							<AvatarFallback className="bg-transparent">JD</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56 border-black border-2 p-2.5 bg-[#ffffff] "
					align="end"
					forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">John Doe</p>
							<p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup className="space-y-1">
						<DropdownMenuItem className="border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF]">
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF]"
							onClick={() => setIsPurchaseHistoryOpen(true)}>
							<ShoppingBag size={24} className="mr-2" />
							Purchase History
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF]">
						<Button onClick={() => signOut({ redirectUrl: "/sign-in" })}>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Log out</span>
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DrawerHistory
				isOpen={isPurchaseHistoryOpen}
				onClose={() => setIsPurchaseHistoryOpen(false)}
			/>
		</>
	);
}
