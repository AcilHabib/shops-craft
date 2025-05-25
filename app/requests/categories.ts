export const getAllCategories = async () => {
    console.log("Fetching categories from API");
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        
        const data = await res.json();
        
        if (!data) {
            throw new Error("No data found");
        }
        
        return data.categories;

    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};