import { Suspense } from "react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryContent from "@/components/CategoryContent/CategoryContent";

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

interface CategoriesPageProps {
	params: {
		categoryId: string;
	};
}

async function getDataCategories(): Promise<Category[]> {
	try {
		const { data, error } = await supabase.from("categories").select(`*, bannerId(*)`);
		if (error) {
			throw new Error(error.message);
		}
		return data;
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
}

function LoadingSkeleton() {
	return (
		<div className="container px-4 mt-24 min-h-screen mx-auto">
			<Skeleton className="w-full h-64 mb-8" />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{[...Array(6)].map((_, i) => (
					<Skeleton key={i} className="h-40" />
				))}
			</div>
		</div>
	);
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
	const categories = await getDataCategories();
	const currentCategory = categories.find((category) => category.id === params.categoryId);

	return (
		<Suspense fallback={<LoadingSkeleton />}>
			<CategoryContent categories={categories} currentCategory={currentCategory} />
		</Suspense>
	);
}
