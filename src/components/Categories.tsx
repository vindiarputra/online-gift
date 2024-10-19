"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/lib/data";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Categories() {
	const [visibleCategories, setVisibleCategories] = useState<string[]>([]);

	const toggleCategory = (categoryId: string) => {
		setVisibleCategories((prev) =>
			prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
		);
	};

	return (
		<div className="w-full  mx-auto mt-8 px-4">
			<h2 className="text-3xl font-bold mb-6 transform -rotate-1">Categories</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{categories.map((category) => (
					<Card
						key={category.categoryNameId}
						className="border-2 border-black hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer"
						onClick={() => toggleCategory(category.categoryNameId)}>
						<CardHeader className="bg-[#A6FAFF] border-b-2 border-black">
							<div className="flex justify-between items-center">
								<CardTitle className="font-bold">{category.categoryName}</CardTitle>
								<Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
									{visibleCategories.includes(category.categoryNameId) ? (
										<ChevronUp className="h-6 w-6" />
									) : (
										<ChevronDown className="h-6 w-6" />
									)}
								</Button>
							</div>
						</CardHeader>
						<CardContent className="p-4">
							{visibleCategories.includes(category.categoryNameId) && (
								<ul className="space-y-2">
									{category.categoryItems.map((item) => (
										<li
											key={item.itemId}
											className="border-black border-2 p-2 bg-white hover:bg-[#fa8cef] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md cursor-pointer transition-all duration-200">
											{item.itemName}
										</li>
									))}
								</ul>
							)}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
