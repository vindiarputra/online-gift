import { Comments } from "@/components/Organisms/Comments";
import CategoryBanners from "@/components/Organisms/PromoBanners";
import HomeCategories from "@/components/Organisms/HomeCategories";
import PromoBanners from "@/components/Organisms/PromoBanners";
import { supabase } from "@/lib/utils";
export const revalidate = 0
export const getDataCategories = async () => {
	try {
		const { data, error } = await supabase.from("categories").select(`*, bannerId(*)`);
		if (error) {
			throw new Error(error.message);
		}
		return data || [];
	} catch (error) {
		return [];
	}
};

export default async function Page() {
	const categories = await getDataCategories();
	const formattedCategories = categories.map((category) => ({
		id: category.id,
		label: category.bannerId.label,
		description: category.bannerId.description,
		image_url: category.bannerId.image_url,
	}));
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<main className="container mx-auto px-4 flex-grow mt-24">
				<PromoBanners />
				<HomeCategories categories={formattedCategories} />
				<Comments />
			</main>
		</div>
	);
}
