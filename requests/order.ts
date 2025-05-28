export const createOrder = async (cartId: string, customerId: string, deliveryType: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders?cartId=${cartId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deliveryType }),
    });
    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    const data = await response.json();
    if (!data || !data.order) {
        throw new Error('Order creation failed');
    }
    return data.order;
};
