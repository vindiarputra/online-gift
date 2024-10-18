"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Categories() {
    const [openCategory, setOpenCategory] = useState(null);
    

	const categories = [
		{ name: "Electronics", items: ["Phones", "Laptops", "Tablets", "Accessories"] },
		{ name: "Clothing", items: ["T-shirts", "Jeans", "Dresses", "Shoes"] },
		{ name: "Home & Garden", items: ["Furniture", "Decor", "Kitchen", "Outdoor"] },
		{ name: "Sports", items: ["Fitness", "Outdoor", "Team Sports", "Water Sports"] },
	];

	const toggleCategory = (index) => {
		setOpenCategory(openCategory === index ? null : index);
	};

	return (
		<div className="w-full max-w-md mx-auto mt-8">
			<h2 className="text-3xl font-bold mb-4 transform -rotate-1">Categories</h2>
			{categories.map((category, index) => (
				<div key={index} className="mb-4">
					<button
						onClick={() => toggleCategory(index)}
						className="w-full flex justify-between items-center p-3 bg-[#A6FAFF] border-2 border-black hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] transition-all duration-200">
						<span className="font-bold">{category.name}</span>
						{openCategory === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
					</button>
					{openCategory === index && (
						<ul className="mt-2 space-y-2">
							{category.items.map((item, itemIndex) => (
								<li
									key={itemIndex}
									className="p-2 bg-white border-2 border-black hover:bg-[#79F7FF] transition-colors duration-200 transform hover:-translate-y-1 hover:translate-x-1">
									{item}
								</li>
							))}
						</ul>
					)}
				</div>
			))}
		</div>
	);
}
