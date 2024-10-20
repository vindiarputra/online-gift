
import CardProduct from "@/components/CardProduct";
import { categories, products } from "@/lib/data";
import React from "react";

const page = ({params}: {params: {slug: string[]}}) => {
	const categoryNameId = params.slug[0];
	const categoryItemsId = params.slug[1];

	const currentCategory = categories.find((category) => category.categoryNameId === categoryNameId);
	const currentProductCategory = products?.filter((product) => product.categoryItemId === categoryItemsId);
	console.log(currentProductCategory)

	const featuredProducts = currentProductCategory?.filter((product) => product.isFeatured === true);
	const nonFeaturedProducts = currentProductCategory?.filter((product) => product.isFeatured === false);

	return (
		<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 mx-8">
			<div className="md:col-span-4">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-3xl font-bold transform -rotate-1">Featured Products</h2>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{featuredProducts.map((product) => (
						<CardProduct key={product.id} {...product} />
					))}
				</div>
			</div>
			<div className="md:col-span-2 lg:col-span-3">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-3xl font-bold transform -rotate-1">Anniversary</h2>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
					{nonFeaturedProducts.map((product) => (
						<CardProduct key={product.id} {...product} />
					))}
				</div>
			</div>
		</div>
	);
};

export default page;
