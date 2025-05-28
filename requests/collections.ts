export const getAllCollections = async () => {
  console.log("Fetching collections from API");
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    if (!data) {
      throw new Error("No data found");
    }

    return data.collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
};

export const getCollectionById = async (collectionId: string) => {
  console.log("Fetching collection by ID from API");
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/collections?collectionId=${collectionId}`
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    if (!data) {
      throw new Error("No data found");
    }

    return data.collection;
  } catch (error) {
    console.error("Error fetching collection by ID:", error);
    return null;
  }
};

export const createCollection = async (
  collectionData: any,
  articleId: string,
  shopId: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections?shopId=${shopId}&articleId=${articleId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collectionData),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create collection");
  }

  const data = await response.json();
  if (!data) {
    throw new Error("No data found");
  }
  return data.collection;
};

export const deleteCollection = async (collectionId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${collectionId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete collection");
    }

    const data = await response.json();
    if (!data) {
      throw new Error("No data found after deletion");
    }

    return data.message || "Collection deleted successfully";
  } catch (error) {
    console.error("Error deleting collection:", error);
    throw error;
  }
};
