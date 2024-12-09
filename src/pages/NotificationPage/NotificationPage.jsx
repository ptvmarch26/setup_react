import React, { useReducer } from "react";
import { Button, Card, Col, Row } from "antd";
import styles from "./NotificationPage.module.scss";
import ProfileUser from "../MyOrderPage/UserProfile.jsx";
import myAvatar from "../../assets/images/avatar.jpg";
import clsx from "clsx";

const initdata = [
  {
    id: 1,
    img: "https://chiaki.vn/upload/news/content/2021/05/thuc-an-cho-cho-con-pedigree-jpg-1620290242-06052021153722.jpg",
    title: "KIỆN HÀNG ĐANG TRÊN ĐƯỜNG VẬN CHUYỂN",
    content: "🎉 Kiện hàng đã chuyển thành công cho đơn vị vận chuyển. Shipper sẽ sớm liên hệ bạn!",
    read: true,
  },
  {
    id: 2,
    img: "https://i.pinimg.com/736x/21/b3/e6/21b3e6294c5c83008fdbb4cc7e0a17ac.jpg",
    title: "NGÀY HỘI THÚ CƯNG - ĐẾN LÀ CÓ QUÀ",
    content: "📢 Với vô số giảm giá, quay số nhận quà hót hòn họn. Còn chần chờ gì không tham gia ngay!",
    read: true,
  },
  {
    id: 3,
    img: "https://img.freepik.com/free-psd/flyer-template-with-dog-food_23-2148514498.jpg",
    title: "KHUYẾN MÃI 1/6 - MUÔN VÀN ƯU ĐÃI CHO BOSS",
    content: "🎉 Chiếc deal khuyến mãi sốc với muôn vàn ưu đãi từ sản phẩm dinh dưỡng, đồ chơi, đồ dùng sinh hoạt!",
    read: false,
  },
  {
    id: 4,
    img: "https://www.tiendauroi.com/wp-content/uploads/2019/07/9dc2c2985f7b96d5379542c522d887ec6c269c62.jpeg",
    title: "KHUYẾN MÃI 1/6 - MUÔN VÀN ƯU ĐÃI CHO BOSS",
    content: "📢 Với vô số giảm giá, quay số nhận quà hót hòn họn. Còn chần chờ gì không tham gia ngay!",
    read: false,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "MARK_ALL_AS_READ":
      return state.map((notification) => ({ ...notification, read: true }));
    case "MARK_AS_READ":
      return state.map((notification) =>
        notification.id === action.payload
          ? { ...notification, read: true }
          : notification
      );
    default:
      return state;
  }
};

const NotificationPage = () => {
  const [notifications, dispatch] = useReducer(reducer, initdata);

  // Đánh dấu tất cả đã đọc
  const markAllAsRead = () => {
    dispatch({ type: "MARK_ALL_AS_READ" });
  };

  return (
    <div className="grid wide">
      <div className={styles.main}>
        <Row gutter={16}>
          <ProfileUser
            full_name="Nguyễn Lê Thanh Huyền"
            src_img={myAvatar}
            name="yurri_2506"
          />
          <Col span={18} className={styles.noti}>
            <div className={styles.wrapBtn}>
              <Button
                onClick={markAllAsRead}
                disabled={notifications.every((n) => n.read)}
                className={styles.btn}
              >
                Đánh dấu tất cả đã đọc
              </Button>
            </div>
            {notifications.map((notification) => (
              <div className={styles.wrapNoti}>
                <Card
                  key={notification.id}
                  className={clsx({
                    [styles.isRead]: notification.read,
                    [styles.isUnread]: !notification.read,
                  })}
                  onClick={() => dispatch({ type: "MARK_AS_READ", payload: notification.id })}
                >
                  <Row>
                    <Col span={4}>
                      <img
                        src={notification.img}
                        alt="Notification"
                        className={styles.img}
                      />
                    </Col>
                    <Col span={20}>
                      <h6>{notification.title}</h6>
                      <p>{notification.content}</p>
                    </Col>
                  </Row>
                </Card>
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NotificationPage;
