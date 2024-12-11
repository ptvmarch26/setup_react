import React, { useState } from 'react'
import styles from './ProductFeedBackPage.module.scss'
import { FaStar } from "react-icons/fa6";
import { CiVideoOn } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

const ProductFeedBackPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const orderId = params.get("product");

    // Lấy orders từ state của location
    const orders = location.state?.orders || [];

    // Tìm đơn hàng dựa trên orderId
    const order = orders.find(order => order.id.toString() === orderId);

    const [rating, setRating] = useState(0);

    const handleStarClick = (index) => {
        setRating(index + 1); // Đặt rating từ 1-5
    };

    const [review, setReview] = useState("");

    const handleInputChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = () => {
        if (review.trim()) {
            navigate("/my-order?tab=1");
            setReview("");
        } else {
            alert("Vui lòng nhập đánh giá trước khi gửi!");
        }
    };

    const handleBack = () => {
        navigate("/my-order?tab=1")
    }

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
                                    {
                                        order.products.map(product => (
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
                                        ))
                                    }
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
    )
}

export default ProductFeedBackPage