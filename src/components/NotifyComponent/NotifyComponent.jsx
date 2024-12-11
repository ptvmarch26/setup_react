import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './NotifyComponent.module.scss'
import clsx from 'clsx'
import order_img from "../../assets/images/order.png"; // Hình ảnh thông báo đơn hàng
import voucher_img from "../../assets/images/voucher.png"; // Hình ảnh thông báo voucher
import product_img from "../../assets/images/product.png"; 
import user_img from '../../assets/images/user.webp'
import { readNotify } from '../../services/Notification.service';
import { useSelector } from 'react-redux';

const NotifyComponent = ({ notifications, className }) => {
    const navigate = useNavigate();
    const { _id} = useSelector((state) => state.user);
    const access_token = localStorage.getItem("accessToken");
    // Hàm xử lý khi click vào thông báo
    const handleNotificationClick = async(notify) => {
        if (!notify.isRead) {
            const res = await readNotify(_id, access_token, notify._id, { isRead: true });
            console.log(res)
        }
        
        if (notify.notify_type === 'Tình trạng đơn hàng') {
            navigate('/my-order')
        } else if (notify.notify_type === 'Sản phẩm') {
            navigate(`/product-details/${notify.product_id}`)
        } else if (notify.notify_type === 'Tài khoản') {
            navigate('/profile')
        } else if (notify.notify_type === 'Khuyến mãi') {
            navigate('/voucher')
        }
    };

    // Lọc ra 6 thông báo đầu tiên để hiển thị
    const visibleNotifications = notifications.slice(0, 6);

    const handleShowMore = () => {
        navigate("/notifications")
    };

    // Hàm để lấy hình ảnh theo loại thông báo
    const getNotificationImage = (type) => {
        switch (type) {
            case 'Tình trạng đơn hàng':
                return order_img;
            case 'Sản phẩm':
                return product_img;
            case 'Khuyến mãi':
                return voucher_img;
            case 'Tài khoản':
                return user_img;
            default:
                return null; 
        }
    };

    // Kiểm tra xem notifications có dữ liệu không
    if (notifications && notifications.length > 0) {
        return (
            <div className={clsx(styles.main, className)}>
                <ul>
                    {visibleNotifications.map((notify, index) => (
                        <li
                            key={index} 
                            onClick={() => handleNotificationClick(notify)}
                            className={clsx({
                                [styles.isRead]: notify.isRead,
                                [styles.isUnread]: !notify.isRead,
                            })}
                        >
                            <Link>
                                <img
                                    src={getNotificationImage(notify.notify_type)} // Lấy ảnh theo loại thông báo
                                    alt={notify.type}
                                />
                                <div className={styles.info}>
                                    <span>{notify.notify_title}</span>
                                    <span>{notify.notify_desc}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                    <li onClick={handleShowMore} className={styles.more}>
                        <Link to={"/notifications"}>
                            Xem thêm
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }

    // Nếu không có thông báo, có thể trả về thông báo không có dữ liệu
    //return <div>No notifications available</div>;
}

export default NotifyComponent;
