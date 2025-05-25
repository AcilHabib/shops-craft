import { CartItem } from "../../lib/shopify/types";

export const createCart = async (userId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart?customerId=${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                checkoutUrl: "<checkout_url>",
                totalQuantity: 3,
                cost: {
                    subtotalAmount: {
                        currencyCode: "USD",
                        amount: "0",
                    },
                    totalAmount: {
                        currencyCode: "USD",
                        amount: "0",
                    },
                    totalTaxAmount: {
                        currencyCode: "USD",
                        amount: "0",
                    },
                },
            }),
        });

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data.cart) {
            throw new Error("No Cart found");
        }

        console.log("Cart created successfully", data.cart);
        return data.cart;
    } catch (error) {
        console.error("Error creating Cart:", error);
        throw error;
    }
}

export const getCart = async (CartId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart?id=${CartId}`);

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data.cart) {
            throw new Error("No Cart found");
        }

        console.log("Cart fetched successfully", data.cart);
        return data.cart;
    } catch (error) {
        console.error("Error fetching Cart:", error);
        throw error;
    }
}

export const createCartItem = async (CartId: string, productId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/items?cartId=${CartId}&productId=${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quantity: 1,
                cost: {
                    totalAmount: {
                        currencyCode: "USD",
                        amount: "0",
                    },
                },
                merchandise: []
            }),
        });

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data.cartItem) {
            throw new Error("No Cart item found");
        }

        console.log("Cart item created successfully", data.cartItem);
        return data.cartItem;
    } catch (error) {
        console.error("Error creating Cart item:", error);
        throw error;
    }
}

export const updateCartItem = async (item: CartItem, quantity: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/items?id=${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quantity: quantity,
                cost: {
                    totalAmount: {
                        currencyCode: "USD",
                        amount: (quantity * Number(item.cost.totalAmount.amount)).toFixed(2),
                    },
                },
            }),
        });

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data.item) {
            throw new Error("No Cart item found");
        }

        console.log("Cart item updated successfully", data.item);
        return data.item;
    } catch (error) {
        console.error("Error updating Cart item:", error);
        throw error;
    }
}

export const deleteCartItem = async (itemId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/items?id=${itemId}`, {method: "DELETE"});

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data.item) {
            throw new Error("No Cart item found");
        }

        console.log("Cart item deleted successfully", data.item);
        return data.item;
    } catch (error) {
        console.error("Error deleting Cart item:", error);
        throw error;
    }
}

export const deleteAllCartItems = async (CartId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/items/all?id=${CartId}`, {method: "DELETE"});

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (!data.item) {
            throw new Error("No Cart item found");
        }

        console.log("All Cart items deleted successfully", data.item);
        return data.item;
    } catch (error) {
        console.error("Error deleting all Cart items:", error);
        throw error;
    }
}