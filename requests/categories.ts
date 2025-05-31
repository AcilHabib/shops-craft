export const getAllCategories = async () => {
  console.log("Fetching categories from API");
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  try {
    const res = await fetch(
      "http://localhost:3000/api/shop_panel/categories/get_all"
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    console.log("Full response JSON:", data);

    if (!data) {
      throw new Error("No data found");
    }

    return data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCategoryById = async (categoryId: string, shopId: string) => {
  console.log("Fetching categories by shopId from API");
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shop_panel/categories/get_by_id?shop_id=${shopId}&categoryId=${categoryId}`
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

export const createCategory = async (categorydata: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shop_panel/categories/create?shop_id=cmb9dqe8q0005ukow55t45fcl`,
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

export const updateCategory = async (
  categoryData: { name: string; tags: string[] },
  id: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shop_panel/categories/update?categoryId=${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update category (status ${response.status})`);
  }

  const data = await response.json();
  if (!data || !data.category) {
    throw new Error("No category data returned from update");
  }

  return data.category;
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shop_panel/categories/delete?id=${categoryId}`,
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
