import React, { FC } from 'react'
import CardProduct from '../CardProduct';
import { CATEGORIES, PRODUCTS } from '@/lib/data';

type CategoryLayoutsProps = {
    categoryId: string;
}

const CategoryLayouts: FC<CategoryLayoutsProps> = ({ categoryId }) => {
    const currentCategory = CATEGORIES.find((category) => category.categoryNameId === categoryId);
    const currentProducts = PRODUCTS.filter((product) => product.categoryId === categoryId);
    const featuredProducts = PRODUCTS.filter((product) => product.isFeatured);
	return (
		<div className="w-full p-4 mt-6 flex flex-col space-y-4">
			<h2 className="text-3xl font-bold">{currentCategory?.categoryName}</h2>
			<div className="text-lg font-semibold max-w-[75%] text-slate-800">
				{currentCategory?.description}
			</div>
			<h2 className="text-3xl font-bold ">Featured Products</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{featuredProducts.map((product) => (
					<CardProduct
						key={product.id}
						id={product.id}
						name={product.name}
						description={product.description}
						price={product.price}
						images={product.images}
						isNew={product.isNew}
						onSale={product.onSale}
					/>
				))}
			</div>
			<h2 className="text-3xl font-bold ">Featured Products</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{currentProducts.map((product) => (
					<CardProduct
						key={product.id}
						id={product.id}
						name={product.name}
						description={product.description}
						price={product.price}
						images={product.images}
						isNew={product.isNew}
						onSale={product.onSale}
					/>
				))}
			</div>
		</div>
	);
};

export default CategoryLayouts
