const API_URL = "http://localhost:3001/api/user";

export const getAllNotification = async (_id, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/notification/${_id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch notifications");
    }

    const data = await response.json();
    console.log(data);
    return data; // Trả về dữ liệu nếu thành công
  } catch (error) {
    console.error("Error in get all notification:", error.message || error);
    throw error; // Ném lỗi để component sử dụng tiếp tục xử lý
  }
};


export const readNotify = async (_id, accessToken, notifyId, readNotify) => {
  console.log(_id)
  try {
    const response = await fetch(`${API_URL}/${_id}/notification-read/${notifyId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(readNotify),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch read notifications");
    }

    const data = await response.json();
    console.log(data);
    return data; // Trả về dữ liệu nếu thành công
  } catch (error) {
    console.error("Error in read notification:", error.message || error);
    throw error; // Ném lỗi để component sử dụng tiếp tục xử lý
  }
};

// Voucher nằm tạm luôn ở đây
export const getAllVoucher = async () => {
  try {
    const response = await fetch(`${API_URL}/discount/get-all-discount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch getAllVoucher");
    }

    const data = await response.json();
    console.log(data);
    return data; // Trả về dữ liệu nếu thành công
  } catch (error) {
    console.error("Error in get all getAllVoucher:", error.message || error);
    throw error; // Ném lỗi để component sử dụng tiếp tục xử lý
  }
};

