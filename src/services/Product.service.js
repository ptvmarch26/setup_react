const API_URL = "https://backend-pawfect.onrender.com/api";

export const getDetailsProduct = async (id) => {
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

// Lấy sản phẩm liên quan
export const getRelatedProducts = async (product_category) => {
  try {
    // Tạo query string với filter
    const params = new URLSearchParams({
      product_category: product_category, // Bộ lọc theo danh mục
      limit: "8", // Giới hạn số sản phẩm trả về
      page: "1",
    });
    console.log("abc", `${API_URL}/product/get-all-product?${params.toString()}`)
    const response = await fetch(
      `${API_URL}/product/get-all-product?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const responseText = await response.text(); // Lấy phản hồi dạng chuỗi
      console.error("Error Response:", responseText); // Log phản hồi lỗi
      throw new Error(responseText);
    }

    const responseText = await response.text(); // Lấy phản hồi dưới dạng chuỗi
    const data = JSON.parse(responseText); // Thử parse thành JSON
    console.log("Related Products:", data);
    return data;
  } catch (error) {
    console.error("Error in getRelatedProducts:", error);
    throw error;
  }
};

// Lấy đánh giá sản phẩm
export const getProductFeedback = async (id) => {
  try {
    const response = await fetch(`${API_URL}/feedback/get-all/${id}`, {
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
    console.error("Error in getProductFeedback:", error);
    throw error;
  }
};

export const getAllProduct = async (params = {}) => {
  try {
    const {
      limit,
      page,
      sort,
      search,
      category_level_1,
      category_level_2,
      category_level_3,
      product_brand,
      product_rate,
      pet_age,
      product_famous,
      priceMin,
      priceMax,
    } = params;
    console.log(params);
    // Tạo đối tượng để lưu trữ các tham số query
    const queryParams = {};
    // Thêm các tham số vào queryParams nếu có
    if (limit) queryParams.limit = limit;
    if (page) queryParams.page = Number(page) 
      else queryParams.page = 1 ;
    if (sort) queryParams.sort = sort;
    if (search) queryParams.search = search;
    if (product_brand) queryParams.product_brand = product_brand;
    if (product_rate) queryParams.product_rate = product_rate;
    if (pet_age) queryParams.pet_age = pet_age;
    if (product_famous == "true")
      queryParams.product_famous = product_famous; // Lọc theo product_famous
    if (priceMin) queryParams.priceMin = priceMin;
    if (priceMax) queryParams.priceMax = priceMax;
    if (category_level_1) queryParams.category_level_1 = category_level_1;
    if (category_level_2) queryParams.category_level_2 = category_level_2;
    if (category_level_3) queryParams.category_level_3 = category_level_3;
    // Chuyển đối tượng queryParams thành query string
    const queryString = new URLSearchParams(queryParams).toString();

    // Tạo URL đầy đủ với query string
    const url = `${API_URL}/product/get-all-product?${queryString}`;
    console.log(url);
    // Gửi yêu cầu API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Kiểm tra mã trạng thái HTTP
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData); // Log thêm lỗi để dễ dàng debug
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    // Kiểm tra nếu dữ liệu trả về là JSON hợp lệ
    const data = await response.json();
    console.log("hi", data);
    return data;
  } catch (error) {
    console.error("Error in getProductsList:", error);
    throw error; // Ném lại lỗi để các nơi khác có thể xử lý
  }
};
