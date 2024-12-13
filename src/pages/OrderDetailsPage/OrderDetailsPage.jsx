import React from "react";
import { useLocation } from "react-router-dom";
import styles from './OrderDetailsPage.module.scss'
import myAvatar from "../../assets/images/avatar.jpg";
import UserProfileComponent from "../../components/UserProfileComponent/UserProfileComponent";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { IoBagHandle } from "react-icons/io5";
import { useSelector } from "react-redux";

const OrderDetailsPage = () => {
    const { isAuthenticated, user_name, user_avt_img, _id, full_name } =
        useSelector((state) => state.user);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderId = params.get("product");

    // Lấy orders từ state của location
    const orders = location.state?.orders || [];

    // Tìm đơn hàng dựa trên orderId
    const order = orders.find(order => order.id.toString() === orderId);

    const totalPrice = order?.products.reduce((total, product) => {
        return total + parseFloat(product.price_new.replace(/[,.]/g, ""));
    }, 0);

    return (
        <div className={styles.main}>
            <div className="grid wide">
                <div className={styles.wrap}>
                    <UserProfileComponent
                        full_name={full_name}
                        src_img={user_avt_img}
                        user_name={user_name}
                        className={styles.user}
                    />
                    <div className={styles.details}>
                        <div className={styles.status}>
                            <h2>Chi tiết Đơn hàng</h2>
                            <p>{order.order_status}</p>
                        </div>
                        <div className={styles.reviceInfo}>
                            <div className={styles.title}>
                                <FaLocationDot style={{ color: "#E87428", fontSize: "1.5rem", marginBottom: "4px" }} />
                                <h3>Thông tin nhận hàng</h3>
                            </div>
                            <div className={styles.infoAddress}>
                                <p><strong>Người nhận:</strong> <span>Võ Văn Phi Thông</span></p>
                                <p><strong>Số điện thoại:</strong> <span>0989980956</span></p>
                                <p><strong>Địa chỉ:</strong> <span>ABCDSED</span></p>
                            </div>
                        </div>
                        <div className={styles.payment}>
                            <div className={styles.paymentMethod}>
                                <MdOutlinePayment style={{ color: "#E87428", fontSize: "1.8rem", marginBottom: "4px" }} />
                                <h3>Phương thức thanh toán</h3>
                            </div>
                            <p>Thanh toán qua thẻ tín dụng</p>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productDetails}>
                                <IoBagHandle style={{ color: "#E87428", fontSize: "1.8rem", marginBottom: "4px" }} />
                                <h3>Thông tin sản phẩm</h3>
                            </div>
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
                                    <div className={styles.total}>
                                        <div className={styles.totalPrice}>
                                            <h3>Tổng tiền:</h3>
                                        </div>
                                        <div>
                                            <p>{totalPrice.toLocaleString("vi-VN")}đ</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>Không tìm thấy đơn hàng hoặc danh sách đơn hàng trống.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
