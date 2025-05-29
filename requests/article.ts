export const getArticleById = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/get_by_id?id=${id}`);
    
    if (!response.ok) {
        throw new Error(`Error fetching article with id ${id}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.article) {
        throw new Error(`Article with id ${id} not found`);
    }

    return data.article;  
};

export const getArticlesByCategory = async (categoryId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/get_by_category_id?category_id=${categoryId}`);

    if (!response.ok) {
        throw new Error(`Error fetching articles for category ${categoryId}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.articles) {
        throw new Error(`No articles found for category ${categoryId}`);
    }

    return data.articles;  
};

export const getArticlesByCollection = async (collectionId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/get_by_collection_id?collection_id=${collectionId}`);

    if (!response.ok) {
        throw new Error(`Error fetching articles for collection ${collectionId}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.articles) {
        throw new Error(`No articles found for collection ${collectionId}`);
    }

    return data.articles;  
};

export const getArticlesByShopId = async (shopId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/get_by_shop_id?shop_id=${shopId}`);

    if (!response.ok) {
        throw new Error(`Error fetching articles for shop ${shopId}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.articles) {
        throw new Error(`No articles found for shop ${shopId}`);
    }

    return data.articles;  
}

export const getAllArticles = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);

    if (!response.ok) {
        throw new Error(`Error fetching all articles: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.articles) {
        throw new Error(`No articles found`);
    }

    return data.articles;
};

export const createArticle = async (articleData: any, shopId: string, collectionId: string, categoryId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/create?shop_id=${shopId}&collection_id=${collectionId}&category_id=${categoryId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
    });

    if (!response.ok) {
        throw new Error(`Error creating article: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.article) {
        throw new Error(`Failed to create article`);
    }

    return data.article;
};

export const updateArticle = async (id: string, articleData: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/update?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
    });

    if (!response.ok) {
        throw new Error(`Error updating article with id ${id}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.article) {
        throw new Error(`Failed to update article with id ${id}`);
    }

    return data.article;
};

export const deleteArticle = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/delete?id=${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Error deleting article with id ${id}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.success) {
        throw new Error(`Failed to delete article with id ${id}`);
    }

    return data.success;
};


