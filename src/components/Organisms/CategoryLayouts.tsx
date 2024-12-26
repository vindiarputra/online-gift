import React, { FC } from "react";
import CardProduct from "../CardProduct";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { supabase } from "@/lib/utils";



type CategoryLayoutsProps = {
	categoryId: string;
};

const fetchProductsData = async () => {
	const { data, error } = await supabase.from("products").select();

	if (error) {
		console.error(error);
		return [];
	}
	return data;
};

const CategoryLayouts: FC<CategoryLayoutsProps> = async ({ categoryId }) => {
	// const currentCategory = CATEGORIES.find((category) => category.categoryNameId === categoryId);
	// const currentProducts = PRODUCTS.filter((product) => product.categoryId === categoryId);
	// const featuredProducts = PRODUCTS.filter((product) => product.isFeatured);

	const productsData = await fetchProductsData();
	const currentProducts = productsData.filter((product) => product.categoryId === categoryId);
	const featuredProducts = currentProducts.filter((product) => product.isFeatured);
	console.log(featuredProducts);

	return (
		<div className="w-full p-4 mt-6 flex flex-col space-y-8 mb-16">
			<h2 className="text-3xl font-semibold ">Featured Products</h2>
			<div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
				{featuredProducts.map((product: any) => (
					<CardProduct
						id={product.id}
						name={product.label}
						description={product.description}
						price={product.price}
						images={product.images_url[0]?.url}
						isNew={false}
						onSale={false}
					/>
				))}
			</div>
			<h2 className="font-semibold text-3xl pt-4">More Gift Ideas</h2>
			<div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
				{currentProducts.map((product) => (
					<CardProduct
						key={product.id}
						id={product.id}
						name={product.label}
						description={product.description}
						price={product.price}
						images={product.images_url[0]?.url}
						isNew={product.isNew}
						onSale={product.onSale}
					/>
				))}
			</div>
		</div>
	);
};

export default CategoryLayouts;
