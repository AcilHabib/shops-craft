'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductContextType {
    products: Product[];
    getProducts: () => Promise<void>;
    addProduct: (product: Product) => void;
    updateProduct: (updatedProduct: Product) => void;
    removeProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const getProducts = async () => {
        const res = await fetch('/api/products', { method: 'GET' });
        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data.products);
    }

    const addProduct = (product: Product) => {
        setProducts((prevProducts) => [...prevProducts, product]);
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
        );
    };

    const removeProduct = (id: number) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, getProducts, addProduct, removeProduct, updateProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};