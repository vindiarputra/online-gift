import { notFound } from "next/navigation";
import { Suspense } from "react";
import { supabase } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import ProductDetail from "./ProductDetail";
import { headers } from "next/headers";

interface Product {
	id: string;
	created_at: string;
	label: string;
	description: string;
	isFeatured: boolean;
	isNew: boolean;
	onSale: boolean;
	price: number;
	stock: number;
	images_url: {
		url: string;
	}[];
	categoryId: string;
}

async function fetchProductById(id: string): Promise<Product | null> {
	const headersList = headers();
	const host = headersList.get("host");
	const protocol = process.env.NODE_ENV === "development" ? "http" : "https"; // Sesuaikan dengan environment
	const baseUrl = `${protocol}://${host}`; // Dinamis berdasarkan request
	const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });
	if (!res.ok) {
		throw new Error("Failed to fetch product");
	}
	return res.json();
}

async function fetchRelatedProducts(
	categoryId: string,
	currentProductId: string
): Promise<Product[]> {
	try {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("categoryId", categoryId)
			.neq("id", currentProductId)
			.limit(10);
		if (error) throw error;
		return data || [];
	} catch (error) {
		console.error("Error fetching related products:", error);
		return [];
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
	const product = await fetchProductById(params.productId);

	if (!product) {
		notFound();
	}

	const relatedProducts = await fetchRelatedProducts(product.categoryId, product.id);

	return (
		<Suspense fallback={<LoadingSkeleton />}>
			<ProductDetail product={product} relatedProducts={relatedProducts} />
		</Suspense>
	);
}
