export const getAllFeedback = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/feedback`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    if (!data.feedback) {
      throw new Error("No feedback found");
    }
    return data.feedback;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return [];
  }
}