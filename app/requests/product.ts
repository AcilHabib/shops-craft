import { TAGS } from "lib/constants";
import { ShopifyProduct } from "lib/shopify/types";
import {
    unstable_cacheLife as cacheLife,
    unstable_cacheTag as cacheTag
} from 'next/cache';

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!data.products) {
            throw new Error("No products found");
        }
        return data.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductById: (id: string) => Promise<ShopifyProduct | null> = async (id) => {
    try {
        console.log("Fetching product with ID:", id);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/product?id=${id}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!data.product) {
            throw new Error("Product not found");
        }
        return data.product;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};

export async function FilterProducts({
  query,
  reverse,
  sortKey
}: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
    }): Promise<ShopifyProduct[]> {
    'use cache';
    cacheTag(TAGS.products);
    cacheLife('days');

    const response = await getAllProducts();
    if (!response) {
        throw new Error("No products found");
    }
    const searchResult = response.filter((product: ShopifyProduct) => {
        return query ? product.title.toLowerCase().includes(query.toLowerCase()) : true;
    });

    if (reverse) {
        searchResult.reverse();
    }

    if (sortKey) {
        searchResult.sort((a: ShopifyProduct, b: ShopifyProduct) => {
            if (sortKey === 'PRICE') {
                return parseFloat(a.priceRange.maxVariantPrice.amount) - parseFloat(b.priceRange.maxVariantPrice.amount);
            }
            return 0;
        });
    }

    return query ? searchResult : response;
}