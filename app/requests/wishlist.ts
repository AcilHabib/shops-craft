export const createWishlist = async (userId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishList?customerId=${userId}`, {method: "POST"});

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data.wishList) {
            throw new Error("No wishlist found");
        }

        console.log("Wishlist created successfully", data.wishList);
        return data.wishList;
    } catch (error) {
        console.error("Error creating wishlist:", error);
        throw error;
    }
}

export const getWishlist = async (wishListId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishList?id=${wishListId}`);

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data.wishList) {
            throw new Error("No wishlist found");
        }

        console.log("Wishlist fetched successfully", data.wishList);
        return data.wishList;
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        throw error;
    }
}

export const createWishlistItem = async (wishListId: string, productId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishList/wishListItem?wishListId=${wishListId}&productId=${productId}`, {method: "POST"});

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data.wishListItemfetch) {
            throw new Error("No wishlist item found");
        }

        console.log("Wishlist item created successfully", data.wishListItemfetch);
        return data.wishListItemfetch;
    } catch (error) {
        console.error("Error creating wishlist item:", error);
        throw error;
    }
}

export const deleteWishlistItem = async (itemId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishList/wishListItem?id=${itemId}`, {method: "DELETE"});

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data.item) {
            throw new Error("No wishlist item found");
        }

        console.log("Wishlist item deleted successfully", data.item);
        return data.item;
    } catch (error) {
        console.error("Error deleting wishlist item:", error);
        throw error;
    }
}

export const deleteAllWishListItems = async (wishlistId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishList/wishListItem/all?id=${wishlistId}`, {method: "DELETE"});

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data.item) {
            throw new Error("No wishlist item found");
        }

        console.log("All wishlist items deleted successfully", data.item);
        return data.item;
    } catch (error) {
        console.error("Error deleting all wishlist items:", error);
        throw error;
    }
}