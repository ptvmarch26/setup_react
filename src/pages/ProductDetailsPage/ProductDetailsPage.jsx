import React, { useState, useEffect } from "react";
import styles from "./ProductDetailsPage.module.scss";
import "./ProductDetailsPage.scss";
import { Col, Pagination, Row } from "antd";
import Slider from "react-slick";
import { IoIosStar } from "react-icons/io";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import UnderLineComponent from "../../components/UnderLineComponent/UnderLineComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import ProductFeedBackComponent from "../../components/ProductFeedBackComponent/ProductFeedBackComponent";
import BackComponent from "../../components/BackComponent/BackComponent";
import NextComponent from "../../components/NextComponent/NextComponent";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/orderSlice";
import facebook from "../../assets/images/facebook.svg";
import instagram from "../../assets/images/instagram.svg";
import tiktok from "../../assets/images/tiktok.svg";
import zalo from "../../assets/images/zalo.svg";
import {
  getDetailsProduct,
  getRelatedProducts,
  getProductFeedback,
} from "../../services/Product.service";
import clsx from "clsx";
import cart from "../../assets/images/cart.svg";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { updateCart, updateFavor } from "../../services/Order.service";
import PopupComponent from "../../components/PopupComponent/PopupComponent";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [numProduct, setNumProduct] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // State cho hình ảnh chính
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [isInViewport, setIsInViewport] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 740px) and (max-width: 1023px)"
    );
    const handleViewportChange = () => setIsInViewport(mediaQuery.matches);

    handleViewportChange();
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  const [isInMobile, setisInMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 739px)");
    const handleViewportChange = () => setisInMobile(mediaQuery.matches);

    handleViewportChange();
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  const fetchProductData = async ({ queryKey }) => {
    const id = queryKey[1]; // Lấy id từ queryKey
    const [details, related, feedback] = await Promise.all([
      getDetailsProduct(id),
      getRelatedProducts(id),
      getProductFeedback(id),
    ]);
    return {
      details: details.data,
      related: related.data,
      feedback: feedback.data,
    };
  };

  const { data, isLoading } = useQuery({
    queryKey: ["product-data", id], // queryKey chứa id
    queryFn: fetchProductData, // Cấu trúc queryFn mới
    enabled: !!id, // Chỉ fetch khi id tồn tại
    refetchOnWindowFocus: false, // Không fetch lại khi chuyển tab
    keepPreviousData: true, // Giữ dữ liệu cũ khi id thay đổi
  });

  const productDetails = data?.details || {};
  const relatedProducts = data?.related || [];
  const productFeedback = data?.feedback || [];
  // Set hình ảnh mặc định là hình ảnh đầu tiên
  useEffect(() => {
    if (productDetails?.product_images?.length) {
      setSelectedImage(productDetails.product_images[0]);
    }
  }, [productDetails]);

  const handleInputChange = (value) => {
    // setNumProduct(
    //   Math.min(
    //     Math.max(1, Number(value)),
    //     selectedVariant?.product_countInStock || 1
    //   )
    // );
    if (!selectedVariant) {
      setNumProduct(1);
      return;
    }

    setNumProduct(
      Math.min(
        Math.max(1, Number(value)),
        selectedVariant?.product_countInStock || 1
      )
    );
  };

  const handleAddToCart = async () => {
    if (!user?.isAuthenticated) {
      navigate("/sign-in", { state: location?.pathname });
    } else if (!selectedVariant) {
      setMessage("Vui lòng chọn một biến thể trước khi thêm vào giỏ hàng")
      setIsPopupVisible(true);
    } else {
      // Gửi API cập nhật giỏ hàng vào DB (lấy ID của người dùng và dữ liệu giỏ hàng)
      const cartData = {
        products: [
          {
            product_id: productDetails?._id,
            variant: selectedVariant?._id,
            quantity: numProduct,
            product_price: selectedVariant?.product_price,
            product_order_type: selectedVariant?.product_order_type,
          },
        ],
      };
      console.log(cartData);
      dispatch(addToCart(cartData));
      try {
        const userId = user._id; // Lấy ID người dùng từ thông tin người dùng đã đăng nhập
        const updatedCart = await updateCart(userId, cartData, accessToken); // Gửi API để cập nhật giỏ hàng
        if (updatedCart) {
          setMessage("Thêm sản phẩm vào giỏ hàng thành công")
          setIsPopupVisible(true);
        }
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi cập nhật giỏ hàng:", error);
        setMessage("Có lỗi xảy ra khi cập nhật giỏ hàng. Vui lòng thử lại.")
        setIsPopupVisible(true);
      }
    }
  };

  const handleChangeCount = (type) => {
    // if (type === "increase") {
    //   setNumProduct((prev) =>
    //     Math.min(prev + 1, selectedVariant?.product_countInStock || 1)
    //   );
    // } else {
    //   setNumProduct((prev) => Math.max(prev - 1, 1));
    // }
    if (!selectedVariant) {
      setNumProduct(1);
      return;
    }

    if (type === "increase") {
      setNumProduct((prev) =>
        Math.min(prev + 1, selectedVariant?.product_countInStock || 1)
      );
    } else {
      setNumProduct((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleVariantClick = (variant) => {
    if (variant !== selectedVariant) {
      setSelectedVariant(variant); // Cập nhật biến thể được chọn
      setNumProduct(1); // Reset số lượng khi chọn biến thể mới
    } else {
      setSelectedVariant(null); // Nếu nhấn vào cùng biến thể, hủy chọn
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <NextComponent
        fontSize="2rem"
        color="#000"
        position="absolute"
        zIndex="2"
        top="42px"
        right="-15px"
      />
    ),
    prevArrow: (
      <BackComponent
        fontSize="2rem"
        color="#000"
        position="absolute"
        zIndex="2"
        top="42px"
        left="-15px"
      />
    ),
  };

  if (isLoading) {
    return <div>Loading product details...</div>;
  }

  // const thumbnails = [productDetails?.product_images || []];
  const thumbnails = [];

  // Kiểm tra xem productDetails có tồn tại và có mảng biến thể không
  if (productDetails?.product_images) {
    // Thêm hình ảnh sản phẩm chính
    thumbnails.push(productDetails.product_images);
  }

  // Nếu có mảng biến thể (variants), duyệt qua từng biến thể và lấy hình ảnh
  if (productDetails?.variants) {
    productDetails.variants.forEach((variant) => {
      if (variant.variant_img) {
        thumbnails.push(variant.variant_img);
      }
    });
  }
  const doubledThumbnails = [...thumbnails, ...thumbnails];
  const feedbackList = productFeedback || [];
  const products = relatedProducts || [];

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleLike = async () => {
    setLike(!like);
    if (!user?.isAuthenticated) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      // Gửi API cập nhật giỏ hàng vào DB (lấy ID của người dùng và dữ liệu giỏ hàng)
      const cartData2 = {
        products: [
          {
            product_id: productDetails?._id,
          },
        ],
      };
      console.log(cartData2);
      dispatch(addToCart(cartData2));
      try {
        const userId = user._id; // Lấy ID người dùng từ thông tin người dùng đã đăng nhập
        const updatedCart = await updateFavor(userId, cartData2, accessToken); // Gửi API để cập nhật giỏ hàng
        if (updatedCart) {
          setMessage("Thêm sản phẩm vào yêu thích thành công")
          setIsPopupVisible(true);
        }
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi cập nhật giỏ hàng:", error);
        setMessage("Có lỗi xảy ra khi cập nhật giỏ hàng. Vui lòng thử lại.")
        setIsPopupVisible(true);
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className="grid wide">
        <Row style={!isInMobile ? { padding: "16px 0 0 0" } : null}>
          {/* Left Section */}
          <Col span={isInViewport || isInMobile ? 24 : 10}>
            {isInViewport || isInMobile ? (
              <div>
                <Slider {...settings2}>
                  {doubledThumbnails.map((thumb, index) => (
                    <div key={index}>
                      {/* <img src={thumb} onClick={()=>setMainImage(thumb)} alt={`Product view ${index + 1}`} /> */}
                      <div className={styles.mainImage}>
                        <img
                          src={`data:image/png;base64,${thumb}`}
                          alt="Product main"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <>
                <div className={styles.mainImage}>
                  <img
                    src={`data:image/png;base64,${selectedImage}`}
                    alt="Product main"
                  />
                </div>
                <Slider {...settings} className={styles.thumbnails}>
                  {doubledThumbnails.map((thumb, index) => (
                    <img
                      key={index}
                      src={`data:image/png;base64,${thumb}`}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setSelectedImage(thumb)}
                      className={styles.thumbnail}
                    />
                  ))}
                </Slider>
              </>
            )}
            <div
              className={clsx(styles.contact, "m-0", "l-12", "m-12", "c-12")}
            >
              <span>Chia sẻ sản phẩm qua:</span>
              <Link to={"https://student.uit.edu.vn/"}>
                <img src={facebook} alt="" />
              </Link>
              <Link to={"https://student.uit.edu.vn/"}>
                <img src={instagram} alt="" />
              </Link>
              <Link to={"https://student.uit.edu.vn/"}>
                <img src={tiktok} alt="" />
              </Link>
              <Link to={"https://student.uit.edu.vn/"}>
                <img src={zalo} alt="" />
              </Link>
            </div>
          </Col>

          {/* Right Section */}
          <Col span={isInViewport || isInMobile ? 24 : 14}>
            <div className={styles.productInfo}>
              <h2>{productDetails?.product_title}</h2>
              <div className={styles.rating}>
                <div className={styles.rt}>
                  <span>{productDetails?.product_rate}</span>
                  {[...Array(5)].map((_, idx) => (
                    <IoIosStar
                      key={idx}
                      className={styles.icon}
                      style={{
                        color:
                          idx < productDetails?.product_rate
                            ? "#ffc107"
                            : "#e4e5e9",
                      }}
                    />
                  ))}
                </div>
                <div className={styles.rt}>
                  <span>
                    {feedbackList?.length || 0} <p>Đánh giá</p>
                  </span>
                </div>
                <div className={styles.sell}>
                  <span>
                    {productDetails?.product_selled} <p>Đã bán</p>
                  </span>
                </div>
              </div>
              <div className={styles.price}>
                {isInMobile ? (
                  <div>
                    <span className={styles.currentPrice}>
                      {selectedVariant
                        ? (
                          selectedVariant?.product_price *
                          (1 - productDetails?.product_percent_discount / 100)
                        ).toLocaleString()
                        : (
                          productDetails?.product_price *
                          (1 - productDetails?.product_percent_discount / 100)
                        ).toLocaleString()}
                      đ
                    </span>
                    <span className={styles.oldPrice}>
                      {selectedVariant
                        ? selectedVariant?.product_price.toLocaleString()
                        : productDetails?.product_price.toLocaleString()}
                      đ
                    </span>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span className={styles.oldPrice}>
                      {selectedVariant
                        ? selectedVariant?.product_price?.toLocaleString()
                        : productDetails?.product_price.toLocaleString()}
                      đ
                    </span>
                    <span className={styles.currentPrice}>
                      {selectedVariant
                        ? (
                          selectedVariant?.product_price *
                          (1 - productDetails?.product_percent_discount / 100)
                        ).toLocaleString()
                        : (
                          productDetails?.product_price *
                          (1 - productDetails?.product_percent_discount / 100)
                        ).toLocaleString()}
                      đ
                    </span>
                  </div>
                )}
                <div className={styles.discount}>
                  <span>{productDetails?.product_percent_discount}% GIẢM</span>
                </div>
              </div>

              <div className={styles.options}>
                <div className={styles.option}>
                  <span>Chọn loại</span>
                  <div className={clsx(styles.choice, "row")}>
                    {productDetails?.variants?.map((variant, index) => (
                      <div className="col l-4 m-4 c-4">
                        <ButtonComponent
                          key={index}
                          title={variant.product_order_type}
                          icon={`data:image/png;base64,${variant.variant_img}`}
                          fontSize="1.2rem"
                          width="170px"
                          widthDiv="none"
                          margin="0 0 10px 0"
                          className={`${styles.btnChoice} ${selectedVariant === variant ? styles.selected : ""
                            }`}
                          onClick={() => handleVariantClick(variant)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.quantity}>
                <span>Số lượng</span>
                <div className={styles.btn}>
                  <button
                    onClick={() => handleChangeCount("decrease")}
                    className={!selectedVariant ? styles.disabled : ""}
                    disabled={!selectedVariant}
                  >
                    -
                  </button>
                  <input
                    value={numProduct}
                    onChange={(e) => handleInputChange(e.target.value)}
                    min={1}
                    max={selectedVariant?.product_countInStock || 1}
                    className={`${styles.quantityInput} ${!selectedVariant ? styles.disabled : ""
                      }`}
                    disabled={!selectedVariant}
                  />
                  <button
                    onClick={() => handleChangeCount("increase")}
                    className={!selectedVariant ? styles.disabled : ""}
                    disabled={!selectedVariant}
                  >
                    +
                  </button>
                </div>
                <p className={styles.remain}>
                  Còn lại: {selectedVariant?.product_countInStock || 0} sản phẩm
                </p>
                <p onClick={handleLike} className={styles.like}>
                  {like ? <FaHeart /> : <FaRegHeart />}
                  {isInMobile ? null : <span>Yêu thích</span>}
                </p>
              </div>
              <div className={styles.actions}>
                <ButtonComponent
                  title="Thêm vào giỏ hàng"
                  fontSize="1.2rem"
                  width="170px"
                  height="50px"
                  widthDiv="none"
                  icon={cart}
                  className={styles.btnAdd}
                  onClick={handleAddToCart}
                />
                <ButtonComponent
                  title="Mua ngay"
                  fontSize="1.2rem"
                  width="200px"
                  height="50px"
                  showIcon={false}
                  widthDiv="none"
                  className={styles.btnBuy}
                  primary
                />
              </div>
            </div>
          </Col>
        </Row>

        {/* Product Description */}
        <div className={styles.productDescription}>
          <div className={styles.title}>
            <h2>Mô tả sản phẩm</h2>
          </div>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {productDetails?.product_description}
          </p>
        </div>

        {/* Feedback Section */}
        <div className={styles.feedback}>
          <div className={styles.title}>
            <h2>Đánh giá sản phẩm</h2>
          </div>
          <div className={styles.overallRating}>
            <div className={styles.totalStar}>
              <span>
                {productDetails?.product_rate}
                <p>/ 5</p>
              </span>
              <div className={styles.star}>
                <IoIosStar className={styles.icon} />
                <IoIosStar className={styles.icon} />
                <IoIosStar className={styles.icon} />
                <IoIosStar className={styles.icon} />
                <IoIosStar className={styles.icon} />
              </div>
            </div>
            <div className={styles.filter}>
              <div className={styles.haveStar}>
                <ButtonComponent
                  title="Tất cả"
                  fontSize="1.5rem"
                  width="100px"
                  height="32px"
                  className={styles.btn}
                  widthDiv="none"
                  showIcon={false}
                />
                <ButtonComponent
                  title="5 Sao"
                  fontSize="1.5rem"
                  width="100px"
                  height="32px"
                  className={styles.btn}
                  widthDiv="none"
                  showIcon={false}
                />
                <ButtonComponent
                  title="4 Sao"
                  fontSize="1.5rem"
                  width="100px"
                  height="32px"
                  className={styles.btn}
                  widthDiv="none"
                  showIcon={false}
                />
                <ButtonComponent
                  title="3 Sao"
                  fontSize="1.5rem"
                  width="100px"
                  height="32px"
                  className={styles.btn}
                  widthDiv="none"
                  showIcon={false}
                />
                <ButtonComponent
                  title="2 Sao"
                  fontSize="1.5rem"
                  width="100px"
                  height="32px"
                  className={styles.btn}
                  widthDiv="none"
                  showIcon={false}
                />
                <ButtonComponent
                  title="1 Sao"
                  fontSize="1.5rem"
                  width="100px"
                  height="32px"
                  className={styles.btn}
                  widthDiv="none"
                  showIcon={false}
                />
              </div>
              <div className={styles.noStar}>
                <ButtonComponent
                  title="Có bình luận"
                  fontSize="1.5rem"
                  width="150px"
                  height="32px"
                  className={styles.btn}
                  widthDiv="none"
                  showIcon={false}
                />
                <ButtonComponent
                  title="Có hình ảnh/video"
                  fontSize="1.5rem"
                  width="150px"
                  height="32px"
                  className={styles.btn}
                  widthDiv="none"
                  showIcon={false}
                />
              </div>
            </div>
          </div>
          <div className={styles.productFeedback}>
            {feedbackList.map((data, index) => (
              <div key={index}>
                <ProductFeedBackComponent
                  img={`data:image/png;base64,${data.user_id.user_avt_img || ""
                    }`}
                  name={data.user_id.user_name || "ẩn danh"}
                  star={data.rating || "ẩn danh"}
                  date={
                    new Date(data.createdAt).toLocaleDateString("vi-VN") ||
                    "ẩn danh"
                  }
                  comment={data.content || "ẩn danh"}
                  imgFeedback={
                    Array.isArray(data.feedback_img)
                      ? data.feedback_img.map(
                        (img) => `data:image/png;base64,${img}`
                      )
                      : []
                  }
                />

                {index !== feedbackList.length - 1 && (
                  <UnderLineComponent
                    width="100%"
                    height="1px"
                    background="#BFBDBC"
                    margin="20px 0 40px 0"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {feedbackList?.length === 0 ? (
          <div className={styles.noFeedback}>
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/shoprating/7d900d4dc402db5304b2.png"
              alt="No Feedback"
              className={styles.img}
            />
            <p>Hiện không có đánh giá nào</p>
          </div>
        ) : (
          <div className={styles.panigation}>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        )}
        {/* Related Products */}
        <div className={styles.otherProduct}>
          <div className={styles.title}>
            <h2>Các sản phẩm tương tự</h2>
          </div>
          <div>
            <div className="row">
              {products.map((product, index) => (
                <div key={index} className="col l-2-4 m-4 c-6">
                  <Link
                    to={`/product-details/${product._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardComponent
                      src={`data:image/png;base64,${product.product_images[0] || ""
                        }`}
                      alt="ảnh sản phẩm"
                      name={product.product_title}
                      oldPrice={product.product_price}
                      newPrice={(
                        product?.product_price *
                        (1 - product?.product_percent_discount / 100)
                      ).toLocaleString()}
                      start={product.rating}
                      percent={product?.product_percent_discount}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <ButtonComponent
            width="400px"
            height="50px"
            title="Xem thêm"
            color="#000"
            border="2px solid #000"
            borderRadius="15px"
            fontSize="2rem"
            margin="0 0 40px 0"
            showIcon={false}
          />
        </div>
        {isPopupVisible && (
          <PopupComponent
            message={message}
            onClose={() => setIsPopupVisible(false)}
            wantClose={false}
          />
        )}
      </div>
    </div>
  );
};
export default ProductDetailsPage;
