export const fetchDeliveries = async () => {
  try {
    const res = await fetch("/api/delivery", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return data.deliveries;
  } catch (error) {
    console.error("Failed to fetch deliveries:", error);
    return [];
  }
};
