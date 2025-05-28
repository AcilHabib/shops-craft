export const createDelivery = async (deliveryData: any) => {
  try {
    const res = await fetch("/api/delivery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deliveryData),
    });

    if (!res.ok) {
      throw new Error("Failed to create delivery");
    }

    const data = await res.json();
    return data.delivery;
  } catch (error) {
    console.error("Error creating delivery:", error);
    return null;
  }
};
