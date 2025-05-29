'use client';

import React from "react";
import { getAllProducts, getProductById } from "requests/product";
import { Reviews, ShopifyProduct } from "../lib/shopify/types";

interface ProductContextType {
    products: ShopifyProduct[];
    setProducts: React.Dispatch<React.SetStateAction<ShopifyProduct[]>>;
    product: ShopifyProduct | null;
    setProduct: React.Dispatch<React.SetStateAction<ShopifyProduct | null>>;
    fetchProducts: () => void;
    fetchProductById: (id: string) => Promise<void>;
    CalculAverageRating: (reviews: Reviews[]) => number;
}

interface ProductProviderProps {
    children: React.ReactNode;
}

const ProductContext = React.createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: ProductProviderProps) => {
    const [products, setProducts] = React.useState<ShopifyProduct[]>([]);
    const [product, setProduct] = React.useState<ShopifyProduct | null>(null);

    const fetchProducts = async () => {
        try {
            const products = await getAllProducts();
            if (!products) throw new Error("Products Not Found");
            setProducts(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    };

    const fetchProductById = async (id: string) => {
        try {
            console.log("Fetching product with ID:", id);
            const product = await getProductById(id);
            if (!product) throw new Error("Product not found");
            setProduct(product);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
        }
    };

    const CalculAverageRating = (reviews: Reviews[]) => {
        if (reviews && reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            return totalRating / reviews.length;
        }
        return 0;
    }

    return (
        <>
            <ProductContext.Provider value={{ 
                products, 
                setProducts, 
                fetchProducts, 
                fetchProductById, 
                product, 
                setProduct,
                CalculAverageRating
            }}>
                {children}
            </ProductContext.Provider>
        </>
    );

}

export default ProductProvider;

export const useProduct = () => {
    const context = React.useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
}

