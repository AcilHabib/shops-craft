import { create } from "domain";

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

export const getCategoryById = async (shopId: string) => {
  console.log("Fetching categories by shopId from API");
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories?shop=${shopId}`
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    if (!data) {
      throw new Error("No data found");
    }

    return data.categories;
  } catch (error) {
    console.error("Error fetching categories by shopId:", error);
    return [];
  }
};

export const createCategory = async (
  categorydata: any,
  articleId: string,
  shopId: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?shopId=${shopId}&articleId=${articleId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categorydata),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  const data = await response.json();
  if (!data) {
    throw new Error("No data found");
  }
  return data.category;
};

// not clear what to do with updateCAtegory

export const deleteCategory = async (categoryId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete category");
    }

    const data = await response.json();
    if (!data) {
      throw new Error("No data found after deletion");
    }

    return data.message || "Category deleted successfully";
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
