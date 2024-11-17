"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function Categories({ categories }: { categories: any[] }) {
	const router = useRouter();

	return (
		<div className="w-full mx-auto mt-8 px-4">
			<h2 className="text-3xl font-semibold mb-6">Categories</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{categories.map((category) => (
					<Link href={`/category/${category.id}`} key={category.id}>
						<Card
							key={category.id}
							className="border-2.5 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer h-max">
							<CardHeader className="bg-[#A6FAFF] border-b-2 border-black  rounded-lg">
								<div className="flex justify-between items-center">
									<CardTitle className="font-bold">{category.label}</CardTitle>
								</div>
							</CardHeader>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
