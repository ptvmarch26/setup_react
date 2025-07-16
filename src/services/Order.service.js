const API_URL = "https://backend-pawfect.onrender.com//api";

export const getAllProductByUserId = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/cart/get-all-product/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    console.log("data", data)
    return data;
  } catch (error) {
    console.error("Error in cart getAllProductByUserId:", error);
    throw error;
  }
};

export const getAllFavoriteByUserId = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/favor/get-details/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in cart getAllProductByUserId:", error);
    throw error;
  }
};

// Cart
export const updateCart = async (id, data, token) => {
  try {
    const response = await fetch(`${API_URL}/cart/update/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    console.log(JSON.stringify(data))
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    
    const dataCart = await response.json();
    console.log(dataCart)
    return dataCart;

  } catch (error) {
    console.error("Error in cart updateCart:", error);
    throw error;
  } 
}

export const updateCart2 = async (id, data, token) => {
  try {
    const response = await fetch(`${API_URL}/cart/update2/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    console.log(JSON.stringify(data))
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    
    const dataCart = await response.json();
    console.log(dataCart)
    return dataCart;

  } catch (error) {
    console.error("Error in cart updateCart:", error);
    throw error;
  } 
}

export const deleteProductCart = async (id, data, token) => {
  try { 
    const response = await fetch(`${API_URL}/cart/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    
    const dataCart = await response.json();
    console.log(dataCart)
    return dataCart;

  } catch (error) {
    console.error("Error in cart updateCart:", error);
    throw error;
  }
}

export const updateFavor = async (id, data, token) => {
  try {
    console.log("dataFE", data)
    console.log(id);
    const response = await fetch(`${API_URL}/favor/update/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    console.log("dataFEaaa", JSON.stringify(data))

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const dataCart = await response.json();
    return dataCart;
  } catch (error) {
    console.error("Error in cart updateFavor:", error);
    throw error;
  }
}

export const deleteProductFavor = async (id, data, token) => {
  try { 
    const response = await fetch(`${API_URL}/favor/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    console.log(JSON.stringify(data))
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    
    const dataCart = await response.json();
    console.log(dataCart)
    return dataCart;

  } catch (error) {
    console.error("Error in cart updateCart:", error);
    throw error;
  }
}

//Order
export const getAllDiscounts = async () => {
  try {
    const response = await fetch(`${API_URL}/discount/get-all-discount`, {
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
    return data;
  } catch (error) {
    console.error("Error in cart getAllProductByUserId:", error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Lỗi khi tạo đơn hàng");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Lỗi kết nối đến server");
  }
};

export const previewOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/order/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Lỗi khi xem trước đơn hàng");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Lỗi kết nối đến server");
  }
};

export const getOrdersByStatus = async (orderStatus, userId) => {
  try {
    // Xây dựng URL với query parameters
    const queryParams = new URLSearchParams();

    // Kiểm tra nếu trạng thái là "Tất cả"
    if (orderStatus === "Tất cả") {
      queryParams.append("orderStatus", "all"); // Gán "all" vào query
    } else if (orderStatus) {
      queryParams.append("orderStatus", orderStatus); // Thêm trạng thái cụ thể
    }

    if (userId) {
      queryParams.append("userId", userId); // Thêm userId vào query
    }

    const url = `${API_URL}/order/filter-status?${queryParams.toString()}`;
    console.log("Request URL:", url); // In URL đã tạo để kiểm tra

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data); // In dữ liệu trả về từ API
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};

export const submitFeedback = async (feedbackData) => {
  try {
    const formData = new FormData();

    // Append fields to the FormData
    formData.append("product_id", feedbackData.product_id);
    formData.append("order_id", feedbackData.order_id);
    formData.append("content", feedbackData.content);
    formData.append("rating", feedbackData.rating);

    // Append images (if any)
    if (feedbackData.images && feedbackData.images.length > 0) {
      feedbackData.images.forEach((image, index) => {
        formData.append(`feedback_img[${index}]`, image);
      });
    }

    // Append videos (if any)
    if (feedbackData.videos && feedbackData.videos.length > 0) {
      feedbackData.videos.forEach((video, index) => {
        formData.append(`feedback_video[${index}]`, video);
      });
    }

    // Call the API
    const response = await fetch(`${API_URL}/feedback/create`, {
      method: "POST",
      body: formData, // Send as multipart/form-data
    });

    if (!response.ok) {
      throw new Error("Failed to submit feedback");
    }

    const data = await response.json();
    return data; // Return response data
  } catch (error) {
    console.error("Error submitting feedback:", error.message);
    throw error;
  }
};

export const changeStatus = async (id) => {
  try {
    const response = await fetch(`${API_URL}/order/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({order_status: "Hủy hàng"})
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    console.log("Cập nhật trạng thái:", data);
    return data;
  } catch (error) {
    console.error("Error in getDetailsOrder:", error);
    throw error;
  }
};
