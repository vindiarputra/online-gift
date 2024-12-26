"use client";

import { notFound, useRouter } from "next/navigation";
import CategoryBanner from "@/components/Organisms/CategoryBanner";
import Categories from "@/components/Organisms/Categories";
import CategoryLayouts from "@/components/Organisms/CategoryLayouts";

interface Category {
	id: string;
	name: string;
	bannerId: {
		id: string;
		label: string;
		description: string;
		image_url: string;
	};
}

interface CategoryContentProps {
	categories: Category[];
	currentCategory: Category | undefined;
}

export default function CategoryContent({ categories, currentCategory }: CategoryContentProps) {
    const router = useRouter()
    if (!currentCategory) {
        router.refresh()
		return notFound();
	}

	return (
		<div className="container px-4 mt-24 min-h-screen mx-auto">
			<CategoryBanner
				id={currentCategory?.bannerId.id}
				label={currentCategory?.bannerId.label}
				description={currentCategory?.bannerId.description}
				image_url={currentCategory?.bannerId.image_url}
			/>
			<Categories categories={categories} />
			<CategoryLayouts categoryId={currentCategory?.id} />
		</div>
	);
}
