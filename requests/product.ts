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

export const getProductById = async (id: string) => {
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