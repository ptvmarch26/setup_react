import React, { useState } from "react";
import styles from "./ProductFeedBackPage.module.scss";
import { FaStar } from "react-icons/fa6";
import { CiVideoOn } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { submitFeedback } from "../../services/Feedback.service";
import { useSelector } from "react-redux";

const ProductFeedBackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("product");
  const { _id } = useSelector((state) => state.user);
  // Lấy orders từ state của location
  const order = location.state?.order || [];

  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1); // Đặt rating từ 1-5
  };

  const [review, setReview] = useState("");

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async () => {
    if (review.trim()) {
      try {
        const dataRequest = {
          order,
          order_id: orderId,
          user_id: _id,
          content: review,
          rating: rating, // ID người dùng
        }
        // Gửi đánh giá lên Backend
        console.log("dataRequest", dataRequest)
        const response = await submitFeedback(dataRequest);

        if (response) {
          alert("Đánh giá đã được gửi thành công!");
          navigate("/my-order?tab=1"); // Điều hướng sau khi gửi thành công
          setReview(""); // Xóa nội dung đánh giá
        } else {
          alert("Gửi đánh giá thất bại. Vui lòng thử lại!");
        }
      } catch (error) {
        console.error("Lỗi khi gửi đánh giá:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
      }
    } else {
      alert("Vui lòng nhập đánh giá trước khi gửi!");
    }
  };

  const handleBack = () => {
    navigate("/my-order?tab=1");
  };

  return (
    <div className={styles.main}>
      <div className="grid wide">
        <div className={styles.wrap}>
          <div className={styles.details}>
            <div className={styles.status}>
              <h2>Đánh giá sản phẩm</h2>
            </div>
            <div className={styles.product}>
              {order ? (
                <div>
                  {order.products.map((product) => (
                    <div key={product.id} className={styles.info}>
                      <img src={product.src_img} />
                      <div className={styles.name}>
                        <h3>{product.product_title}</h3>
                        <p>{product.product_description}</p>
                        <p>x{product.number}</p>
                      </div>
                      <div className={styles.price}>
                        <span>{product.price_old}đ</span>
                        <span>{product.price_new}đ</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Không tìm thấy đơn hàng hoặc danh sách đơn hàng trống.</p>
              )}
            </div>
            <div className={styles.quanlity}>
              <h3>Chất lượng sản phẩm:</h3>
              <div className={styles.stars}>
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={index < rating ? styles.activeStar : styles.star}
                    onClick={() => handleStarClick(index)}
                  >
                    <FaStar />
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.add}>
              <div className={styles.addPicture}>
                <CiCamera className={styles.icon} />
                <p>Thêm hình ảnh</p>
              </div>
              <div className={styles.addPicture}>
                <CiVideoOn className={styles.icon} />
                <p>Thêm video</p>
              </div>
            </div>
            <textarea
              className={styles.textarea}
              value={review}
              onChange={handleInputChange}
              placeholder="Nhập đánh giá của bạn ở đây..."
            />
            <div className={styles.allBtn}>
              <ButtonComponent
                title="Hủy"
                className={styles.btn}
                widthDiv="none"
                showIcon={false}
                onClick={handleBack}
              />
              <ButtonComponent
                title="Đánh giá"
                primary
                className={styles.btnPrimary}
                widthDiv="none"
                showIcon={false}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeedBackPage;
// import React, { useState } from "react";
// import styles from "./ProductFeedBackPage.module.scss";
// import { FaStar } from "react-icons/fa6";
// import { CiVideoOn } from "react-icons/ci";
// import { CiCamera } from "react-icons/ci";
// import { useLocation, useNavigate } from "react-router-dom";
// import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
// import { submitFeedback } from "../../services/Order.service";

// const ProductFeedBackPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const params = new URLSearchParams(location.search);
//   const orderId = params.get("product");

//   // Lấy order từ state của location
//   const order = location.state?.order || [];

//   // State lưu các đánh giá theo từng sản phẩm
//   const [feedbacks, setFeedbacks] = useState(
//     order.products.map((product) => ({
//       product_id: product.id,
//       rating: 0,
//       review: "",
//       images: [],
//       videos: [],
//     }))
//   );

//   const handleStarClick = (productId, rating) => {
//     setFeedbacks((prevFeedbacks) =>
//       prevFeedbacks.map((fb) =>
//         fb.product_id === productId ? { ...fb, rating } : fb
//       )
//     );
//   };

//   const handleInputChange = (productId, value) => {
//     setFeedbacks((prevFeedbacks) =>
//       prevFeedbacks.map((fb) =>
//         fb.product_id === productId ? { ...fb, review: value } : fb
//       )
//     );
//   };

//   const handleAddMedia = (productId, type, file) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       setFeedbacks((prevFeedbacks) =>
//         prevFeedbacks.map((fb) =>
//           fb.product_id === productId
//             ? {
//                 ...fb,
//                 [type]: [...fb[type], reader.result],
//               }
//             : fb
//         )
//       );
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmitFeedback = async (productId) => {
//     const feedback = feedbacks.find((fb) => fb.product_id === productId);
//     if (!feedback.review.trim() || feedback.rating === 0) {
//       alert("Vui lòng nhập đánh giá và chọn số sao trước khi gửi!");
//       return;
//     }

//     try {
//       const response = await submitFeedback({
//         product_id: productId,
//         order_id: orderId,
//         content: feedback.review,
//         rating: feedback.rating,
//       });

//       if (response) {
//         alert("Gửi đánh giá thành công!", response);
//       } else {
//         alert("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!");
//       }
//     } catch (error) {
//       console.error("Error submitting feedback:", error.message);
//       alert("Đã xảy ra lỗi khi gửi đánh giá.");
//     }
//   };

//   const handleBack = () => {
//     navigate("/my-order?tab=1");
//   };

//   return (
//     <div className={styles.main}>
//       <div className="grid wide">
//         <div className={styles.wrap}>
//           <div className={styles.details}>
//             <div className={styles.status}>
//               <h2>Đánh giá sản phẩm</h2>
//             </div>
//             {order.products.map((product) => (
//               <div key={product.id} className={styles.info}>
//                 <img src={product.src_img} alt="product" />
//                 <div className={styles.name}>
//                   <h3>{product.product_title}</h3>
//                   <p>{product.product_description}</p>
//                   <p>x{product.number}</p>
//                 </div>
//                 <div className={styles.price}>
//                   <span>{product.price_old}đ</span>
//                   <span>{product.price_new}đ</span>
//                 </div>
//                 <div className={styles.quanlity}>
//                   <h3>Chất lượng sản phẩm:</h3>
//                   <div className={styles.stars}>
//                     {[...Array(5)].map((_, index) => (
//                       <span
//                         key={index}
//                         className={
//                           index <
//                           feedbacks.find((fb) => fb.product_id === product.id)
//                             .rating
//                             ? styles.activeStar
//                             : styles.star
//                         }
//                         onClick={() => handleStarClick(product.id, index + 1)}
//                       >
//                         <FaStar />
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className={styles.add}>
//                   <label className={styles.addPicture}>
//                     <CiCamera className={styles.icon} />
//                     <p>Thêm hình ảnh</p>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       style={{ display: "none" }}
//                       onChange={(e) =>
//                         handleAddMedia(product.id, "images", e.target.files[0])
//                       }
//                     />
//                   </label>
//                   <label className={styles.addPicture}>
//                     <CiVideoOn className={styles.icon} />
//                     <p>Thêm video</p>
//                     <input
//                       type="file"
//                       accept="video/*"
//                       style={{ display: "none" }}
//                       onChange={(e) =>
//                         handleAddMedia(product.id, "videos", e.target.files[0])
//                       }
//                     />
//                   </label>
//                 </div>
//                 <textarea
//                   className={styles.textarea}
//                   value={
//                     feedbacks.find((fb) => fb.product_id === product.id)
//                       ?.review || ""
//                   }
//                   onChange={(e) =>
//                     handleInputChange(product.id, e.target.value)
//                   }
//                   placeholder="Nhập đánh giá của bạn ở đây..."
//                 />
//                 <div className={styles.allBtn}>
//                   <ButtonComponent
//                     title="Đánh giá"
//                     primary
//                     className={styles.btnPrimary}
//                     widthDiv="none"
//                     showIcon={false}
//                     onClick={() => handleSubmitFeedback(product.id)}
//                   />
//                 </div>
//               </div>
//             ))}
//             <ButtonComponent
//               title="Quay lại"
//               className={styles.btn}
//               widthDiv="none"
//               showIcon={false}
//               onClick={handleBack}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductFeedBackPage;
