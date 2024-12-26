import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryContent from "@/app/(root)/category/[categoryId]/CategoryContent";
import { headers } from "next/headers";

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
	const headersList = headers();
	const host = headersList.get("host");
	const protocol = process.env.NODE_ENV === "development" ? "http" : "https"; // Sesuaikan dengan environment
	const baseUrl = `${protocol}://${host}`; // Dinamis berdasarkan request
	const res = await fetch(`${baseUrl}/api/categories`, { cache: "no-store" });
	if (!res.ok) {
		throw new Error("Failed to fetch categories");
	}
	return res.json();
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
