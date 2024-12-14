const API_URL = "http://localhost:3001/api";

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
export const getAllDiscounts = async (products) => {
  const dataProducts = {
    "cartItems": [{
      category_id: products.id
    }]
  }
  console.log("truoc khi call", dataProducts);
  try {
    const response = await fetch(`${API_URL}/discount/get-all-discount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataProducts)
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