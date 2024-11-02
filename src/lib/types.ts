type ColorOption = {
	name: string;
	image: string;
	stock: number;
};

export type Categories = {
	categoryName: string;
	categoryNameId: string;
	description: string;
	image: string
	categoryItems: {
		itemName: string;
		itemId: string;
	}[];
}[];

export type Products = {
	id: string;
	name: string;
	price: number;
	description: string;
	categoryId: string;
	categoryItemId: string;
	images: string[];
	stock: number;
	isNew?: boolean;
	onSale?: boolean;
	isFeatured: boolean;
	createdAt: string;
	updatedAt: string;
	colors: ColorOption[]
}[];
