import { Comments } from "@/components/Organisms/Comments";
import HomeCategories from "@/components/Organisms/HomeCategories";
import PromoBanners from "@/components/Organisms/PromoBanners";
import { headers } from "next/headers";
export const revalidate = 0

const getDataCategories = async () => {
	const headersList = headers();
	const host = headersList.get("host");
	const protocol = process.env.NODE_ENV === "development" ? "http" : "https"; // Sesuaikan dengan environment
	const baseUrl = `${protocol}://${host}`; // Dinamis berdasarkan request
	const res = await fetch(`${baseUrl}/api/categories`, { cache: "no-store" });
	if (!res.ok) {
		throw new Error("Failed to fetch categories");
	}
	return res.json();
};

export default async function Page() {
	const categories = await getDataCategories();
	const formattedCategories = categories.map((category: { id: string; bannerId: { label: string; description: string; image_url: string; }; }) => ({
		id: category.id,
		label: category.bannerId.label,
		description: category.bannerId.description,
		image_url: category.bannerId.image_url,
	}));
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<main className="container mx-auto px-4 flex-grow mt-32">
				<PromoBanners />
				<HomeCategories categories={formattedCategories} />
				<Comments />
			</main>
		</div>
	);
}
