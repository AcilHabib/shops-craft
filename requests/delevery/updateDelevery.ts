export const updateDelivery = async (deliveryData: any) => {
  try {
    const res = await fetch("/api/delivery", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deliveryData),
    });

    if (!res.ok) {
      throw new Error("Failed to update delivery");
    }

    const data = await res.json();
    return data.delivery;
  } catch (error) {
    console.error("Error updating delivery:", error);
    return null;
  }
};
