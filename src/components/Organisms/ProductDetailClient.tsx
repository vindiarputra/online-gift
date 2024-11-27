"use client";

import React from "react";
import ProductDetailLayout from "@/components/Organisms/ProductDetailLayout";



interface ProductDetailClientProps {
	product: any;
	productsData: any[];
}


const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product, productsData }) => {
	return <ProductDetailLayout product={product} productsData={productsData} />;
};

export default ProductDetailClient;
