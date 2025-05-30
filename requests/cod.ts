export const getCodById = async (codId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cod/get_by_id?id=${codId}`);

    if (!response.ok) {
        throw new Error(`Error fetching COD with ID ${codId}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.cod) {
        throw new Error(`No COD found with ID ${codId}`);
    }

    return data.cod;
};

export const getCodByDeliveryId = async (deliveryId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cod/get_by_delivery_id?delivery_id=${deliveryId}`);

    if (!response.ok) {
        throw new Error(`Error fetching COD for delivery ID ${deliveryId}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.cod) {
        throw new Error(`No COD found for delivery ID ${deliveryId}`);
    }

    return data.cod;
}

export const getCodByShopId = async (shopId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cod/get_by_shop_id?shop_id=${shopId}`);

    if (!response.ok) {
        throw new Error(`Error fetching COD for shop ID ${shopId}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.cod) {
        throw new Error(`No COD found for shop ID ${shopId}`);
    }

    return data.cod;
}

export const getAllCods = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cod`);

    if (!response.ok) {
        throw new Error(`Error fetching all CODs: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.cod) {
        throw new Error(`No CODs found`);
    }

    return data.cod;
};

export const createCod = async (codData: any, shopId: string, deliveryId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cod/create?shop_id=${shopId}&delivery_id=${deliveryId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(codData),
    });

    if (!response.ok) {
        throw new Error(`Error creating COD: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.cod) {
        throw new Error(`Failed to create COD`);
    }

    return data.cod;
};

export const updateCod = async (codId: string, codData: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cod/update?id=${codId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(codData),
    });

    if (!response.ok) {
        throw new Error(`Error updating COD with ID ${codId}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.cod) {
        throw new Error(`Failed to update COD with ID ${codId}`);
    }

    return data.cod;
};

export const deleteCod = async (codId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cod/delete?id=${codId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Error deleting COD with ID ${codId}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.success) {
        throw new Error(`Failed to delete COD with ID ${codId}`);
    }

    return data.success;
};
