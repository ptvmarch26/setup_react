const API_URL = "http://localhost:3001/api";

export const submitFeedback = async (id) => {
  try {
    const response = await fetch(`${API_URL}/product/get-details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    console.log("Product Details:", data);
    return data;
  } catch (error) {
    console.error("Error in getDetailsProduct:", error);
    throw error;
  }
};