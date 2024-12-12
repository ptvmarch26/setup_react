
// import React, { useReducer } from "react";
// import { Button, Card, Col, Row } from "antd";
// import "./Notification.css"; // Đảm bảo CSS được định nghĩa tại đây
// import ProfileUser from "../MyOrderPage/UserProfile.jsx";
// import myAvatar from "../../assets/images/avatar.jpg";

// const initdata = [
//   {
//     id: 1,
//     img: "https://chiaki.vn/upload/news/content/2021/05/thuc-an-cho-cho-con-pedigree-jpg-1620290242-06052021153722.jpg",
//     title: "KIỆN HÀNG ĐANG TRÊN ĐƯỜNG VẬN CHUYỂN",
//     content: "🎉 Kiện hàng đã chuyển thành công cho đơn vị vận chuyển. Shipper sẽ sớm liên hệ bạn!",
//     read: false,
//   },
//   {
//     id: 2,
//     img: "https://i.pinimg.com/736x/21/b3/e6/21b3e6294c5c83008fdbb4cc7e0a17ac.jpg",
//     title: "NGÀY HỘI THÚ CƯNG - ĐẾN LÀ CÓ QUÀ",
//     content: "📢 Với vô số giảm giá, quay số nhận quà hót hòn họn. Còn chần chờ gì không tham gia ngay!",
//     read: false,
//   },
//   {
//     id: 3,
//     img: "https://img.freepik.com/free-psd/flyer-template-with-dog-food_23-2148514498.jpg",
//     title: "KHUYẾN MÃI 1/6 - MUÔN VÀN ƯU ĐÃI CHO BOSS",
//     content: "🎉 Chiếc deal khuyến mãi sốc với muôn vàn ưu đãi từ sản phẩm dinh dưỡng, đồ chơi, đồ dùng sinh hoạt!",
//     read: false,
//   },
//   {
//     id: 4,
//     img: "https://www.tiendauroi.com/wp-content/uploads/2019/07/9dc2c2985f7b96d5379542c522d887ec6c269c62.jpeg",
//     title: "KHUYẾN MÃI 1/6 - MUÔN VÀN ƯU ĐÃI CHO BOSS",
//     content: "📢 Với vô số giảm giá, quay số nhận quà hót hòn họn. Còn chần chờ gì không tham gia ngay!",
//     read: false,
//   },
// ];

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "MARK_ALL_AS_READ":
//       return state.map((notification) => ({ ...notification, read: true }));
//     default:
//       return state;
//   }
// };

// const NotificationPage = () => {
//   const [notifications, dispatch] = useReducer(reducer, initdata);

//   // Đánh dấu tất cả đã đọc
//   const markAllAsRead = () => {
//     dispatch({ type: "MARK_ALL_AS_READ" });
//   };

//   // Hàm kiểm tra trạng thái và trả về lớp CSS
//   const isRead = (read) => (read ? "notification read" : "notification unread");

//   return (
//     <div className="grid wide">
//       <div style={{ margin: "0 auto", padding: "20px" }} className="container">
//         <div className="notice-container">
//           <ProfileUser full_name="Nguyễn Lê Thanh Huyền" src_img={myAvatar} name="yurri_2506" />
//           <div className="content">
//             <div className="action-buttons">
//               <Button onClick={markAllAsRead} disabled={notifications.every((n) => n.read)}
//                 className="confirm-read-button">
//                 Đánh dấu tất cả đã đọc
//               </Button>
//             </div>
//             <div className="notifications">
//               {notifications.map((notification) => (
//                 <Card key={notification.id} className={isRead(notification.read)}>
//                   <Row>
//                     <Col span={4}>
//                       <img
//                         src={notification.img}
//                         alt="Notification"
//                         style={{ width: "100%", borderRadius: "5px" }}
//                       />
//                     </Col>
//                     <Col span={20}>
//                       <h6 className="notification-title">{notification.title}</h6>
//                       <p className="notification-content">{notification.content}</p>
//                     </Col>
//                   </Row>
//                 </Card>
//               ))}
//               {notifications.length === 0 && <p>Không có thông báo nào.</p>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationPage;
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spin, message } from "antd";
import order_img from "../../assets/images/order.png"; // Hình ảnh thông báo đơn hàng
import voucher_img from "../../assets/images/voucher.png"; // Hình ảnh thông báo voucher
import product_img from "../../assets/images/product.png";
import user_img from '../../assets/images/user.webp'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllNotification, readNotify } from "../../services/Notification.service.js";
import UserProfileComponent from "../../components/UserProfileComponent/UserProfileComponent.jsx";
import styles from './NotificationPage.module.scss'
import './NotificationPage.scss'
import clsx from "clsx";

const NotificationPage = () => {
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [notifications, setNotifications] = useState([]); // Lưu trữ thông báo
  const { _id, full_name, user_name, user_avt_img } = useSelector((state) => state.user);
  const access_token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // Lấy thông báo từ API khi component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getAllNotification(_id, access_token);
        setNotifications(res.data || []);
        setLoading(false); // Cập nhật trạng thái khi dữ liệu đã được tải
      } catch (error) {
        setLoading(false);
        setError("Lỗi khi tải thông báo.");
        message.error("Không thể tải thông báo.");
      }
    };

    fetchNotifications();
  }, [_id, access_token]); // Lấy lại thông báo khi _id hoặc access_token thay đổi

  // Đánh dấu tất cả thông báo là đã đọc
  const markAllAsRead = async () => {
    try {
      // Cập nhật trạng thái trong ứng dụng (React state)
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));
      setNotifications(updatedNotifications);

      // Gọi API để cập nhật trạng thái 'isRead' trên server (backend)
      const res = await Promise.all(
        updatedNotifications.map((notification) =>
          readNotify(_id, access_token, notification._id, { isRead: true })
        )
      );
      console.log("Thông báo đã được đánh dấu là đã đọc:", res);
    } catch (error) {
      message.error("Không thể đánh dấu tất cả thông báo là đã đọc.");
    }
  };

  // Hàm để lấy hình ảnh đúng theo loại thông báo
  const getNotificationImage = (type) => {
    switch (type) {
      case "Tình trạng đơn hàng":
        return order_img;
        break; // Hình ảnh thông báo đơn hàng
      case "Sản phẩm":
        return product_img;
        break;// Hình ảnh thông báo sản phẩm
      case "Khuyến mãi":
        return voucher_img;
        break;
      case 'Tài khoản':
        return user_img;
        break;
      default:
        return null;
    }
  };
  // Xử lý khi người dùng nhấn vào thông báo
  const handleNotificationClick = async (notification) => {
    try {

      // Nếu cần gọi API backend để đánh dấu đã đọc, thêm tại đây
      if (!notification.isRead) {
        const res = await readNotify(_id, access_token, notification._id, { isRead: true });
        console.log(res)
      }
      // Điều hướng hoặc thực hiện hành động theo loại thông báo
      switch (notification.notify_type) {
        case "Tình trạng đơn hàng":
          navigate("/my-order"); // Điều hướng tới trang chi tiết đơn hàng
          break;
        case "Sản phẩm":
          navigate(`/product-details/${notification.product_id}`); // Điều hướng tới trang chi tiết sản phẩm
          break;
        case "Khuyến mãi":
          navigate('/voucher');
          break;
        case 'Tài khoản':
          navigate('/profile');
          break;
        default:
          message.info("Thông báo không có liên kết cụ thể.");
      }
    } catch (error) {
      message.error("Không thể đánh dấu thông báo là đã đọc.");
    }
  };

  return (
    <div className="grid wide">
      <div className={styles.main}>
        <Row gutter={16}>
          <UserProfileComponent
            full_name={full_name}
            src_img={user_avt_img}
            user_name={user_name}
            className={styles.user}
          />
          <Col span={18} className={styles.noti}>
            <div className={styles.wrapBtn}>
              <Button
                onClick={markAllAsRead}
                disabled={notifications.every((n) => n.isRead)}
                className={styles.btn}
              >
                Đánh dấu tất cả đã đọc
              </Button>
            </div>
            <div>
              {notifications.map((notification) => (
                <div key={notification.id} className={styles.wrapNoti}>
                  <Card
                    className={clsx({
                      [styles.isRead]: notification.isRead,
                      [styles.isUnread]: !notification.isRead,
                    })}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className={styles.info}>
                      <img
                        src={getNotificationImage(notification.notify_type)} // Hiển thị hình ảnh theo loại thông báo
                        alt={notification.type}
                        className={styles.img}
                      />
                      <div className={styles.content}>
                        <h6>{notification.notify_title}</h6>
                        <p>{notification.notify_desc}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}

            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NotificationPage;
