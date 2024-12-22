const API_URL = "http://localhost:3001/api";

export const submitFeedback = async (orderData) => {
  try {
    // Lặp qua từng đơn hàng trong orderData
    const feedbackPromises = orderData.order.products.map(async (orderId) => {
      const feedbackPayload = {
        product_id: orderId?.id,
        variant_id: orderId?.product_description,
        order_id: orderData.order_id,
        user_id: orderData.user_id,
        content: orderData.content,
        rating: orderData.rating,
      };
      console.log("feedbackPayload", feedbackPayload)
      // Gửi yêu cầu tạo feedback cho từng đơn hàng
      const response = await fetch(`${API_URL}/feedback/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackPayload),
      });

      // Kiểm tra nếu phản hồi từ server không thành công
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      return await response.json(); // Trả về kết quả nếu thành công
    });

    // Chờ tất cả các yêu cầu hoàn thành
    const results = await Promise.all(feedbackPromises);
    console.log("Feedbacks created successfully:", results);
    return results; // Trả về danh sách kết quả đã tạo
  } catch (error) {
    console.error("Error in submitting feedbacks:", error);
    throw error;
  }
};
