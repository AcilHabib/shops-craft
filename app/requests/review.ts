 export const getProductReviews = async (id: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/review?id=${id}`
        );
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await res.json();
        if (!data.reviews) {
            throw new Error("No reviews found");
        }
        console.log("Product reviews", data);
     return data.reviews;
    } catch (error) {
        console.error("Error fetching product reviews:", error);
        return [];
    }
};

export const createReview = async (review: any, productId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/review?productId=${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            ...review,
            }),
        });

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data.review) {
            throw new Error("No review found");
        }

        console.log("Review submitted successfully", data.review);
        return data.review;
    } catch (error) {
        console.error("Error fetching product reviews:", error);
        throw error;
    }
};