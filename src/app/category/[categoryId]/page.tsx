
import Categories from "@/components/Organisms/Categories";
import CategoryBanners from "@/components/Organisms/CategoryBanners";
import CategoryLayouts from "@/components/Organisms/CategoryLayouts";
import React, { FC } from "react";

interface CategoriesPageProps {
	params: {
		categoryId: string;
	};
}

const CategoriesPage: FC<CategoriesPageProps> = ({ params }) => {
	return (
		<div className="container px-4 mt-24 min-h-screen mx-auto">
			<CategoryBanners />
			<Categories />
			<CategoryLayouts categoryId={ params.categoryId} />
		</div>
	);
};

export default CategoriesPage;
