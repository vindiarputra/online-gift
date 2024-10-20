export type Categories = {
	categoryName: string;
	categoryNameId: string;
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
}[];
