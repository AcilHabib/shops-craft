export const deleteDelivery = async (id: any) => {
  try {
    const res = await fetch("/api/delivery", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Failed to delete delivery");
    }

    const data = await res.json();
    return data.message;
  } catch (error) {
    console.error("Error deleting delivery:", error);
    return null;
  }
};
