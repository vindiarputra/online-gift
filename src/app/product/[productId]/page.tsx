import { notFound } from "next/navigation";
import { Suspense } from "react";
import { supabase } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import ProductDetailClient from "@/components/Organisms/ProductDetailClient";

interface Product {
	id: string;
	// Add other product properties here
}

async function fetchProductsData(): Promise<Product[]> {
	try {
		const { data, error } = await supabase.from("products").select("*");
		if (error) throw error;
		return data || [];
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}

async function fetchProductById(id: string): Promise<Product | null> {
	try {
		const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Error fetching product:", error);
		return null;
	}
}

function LoadingSkeleton() {
	return (
		<div className="container mx-auto px-4 py-8">
			<Skeleton className="h-64 w-full mb-8" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<Skeleton className="h-96" />
				<div>
					<Skeleton className="h-12 w-3/4 mb-4" />
					<Skeleton className="h-6 w-1/2 mb-2" />
					<Skeleton className="h-24 w-full mb-4" />
					<Skeleton className="h-10 w-1/3" />
				</div>
			</div>
		</div>
	);
}

export default async function ProductDetailPage({ params }: { params: { productId: string } }) {
	const [productById, productsData] = await Promise.all([
		fetchProductById(params.productId),
		fetchProductsData(),
	]);

	if (!productById) {
		notFound();
	}

	return (
		<Suspense fallback={<LoadingSkeleton />}>
			<ProductDetailClient product={productById} productsData={productsData} />
		</Suspense>
	);
}
