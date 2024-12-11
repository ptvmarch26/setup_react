import React, { useEffect, useState } from "react";
import { Tabs, Input, Card, Button, Typography, Row, Col } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./MyOrderPage.scss";
import styles from './MyOrderPage.module.scss'
import OrderCart from  "./OrderCart.jsx";
import { useSelector } from "react-redux";
import myAvatar from "../../assets/images/avatar.jpg";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent.jsx";
import UserProfileComponent from "../../components/UserProfileComponent/UserProfileComponent.jsx";

const { TabPane } = Tabs;
const { Text } = Typography;

const MyOrderPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "1";

  const menuTab = {
    1: "Tất cả",
    2: "Chờ xác nhận",
    3: "Đang vận chuyển",
    4: "Hoàn thành",
    5: "Đã hủy",
    6: "Trả hàng/Hoàn tiền",
  };

  const { isAuthenticated, user_name, user_avt_img, _id, full_name} = useSelector(
    (state) => state.user
  );

  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    navigate(`/my-order?tab=${key}`);
  };


  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 740px) and (max-width: 1023px)');
    const handleViewportChange = () => setIsInViewport(mediaQuery.matches);

    handleViewportChange();
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

  const [isInMobile, setisInMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 739px)');
    const handleViewportChange = () => setisInMobile(mediaQuery.matches);

    handleViewportChange();
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

  const handleProductClick = (orderId) => {
    navigate(`/order-details?tab=${currentTab}&product=${orderId}`, {
      state: { orders }, // Truyền orders qua state
    });
  };

  const handleFeedBackClick = (orderId) => {
    navigate(`/product-feedback?tab=${currentTab}&product=${orderId}`, {
      state: { orders }, // Truyền orders qua state
    });
  }
  
  const orders = [
    {
      id: 1,
      order_status: "Hoàn thành",
      products: [
        {
          id: 101,
          product_title: "Thức ăn dạng hạt cho chó",
          product_description: "Phân loại hàng: Thức ăn",
          number: "1",
          src_img: myAvatar,
          price_old: "400.000",
          price_new: "320.000",
        },
        {
          id: 102,
          product_title: "Sữa tắm cho chó",
          product_description: "Phân loại hàng: Sữa tắm",
          number: "2",
          src_img: myAvatar,
          price_old: "150.000",
          price_new: "120.000",
        },
      ],
    },
    {
      id: 2,
      order_status: "Đang vận chuyển",
      products: [
        {
          id: 201,
          product_title: "Dầu xả cho chó",
          product_description: "Phân loại hàng: Dầu xả",
          number: "1",
          price_old: "200.000",
          price_new: "180.000",
        },
      ],
    },
    {
      id: 3,
      order_status: "Đã hủy",
      products: [
        {
          id: 201,
          product_title: "Dầu xả cho chó",
          product_description: "Phân loại hàng: Dầu xả",
          number: "1",
          price_old: "200.000",
          price_new: "180.000",
        },
      ],
    },
    {
      id: 4,
      order_status: "Trả hàng/Hoàn tiền",
      products: [
        {
          id: 201,
          product_title: "Dầu xả cho chó",
          product_description: "Phân loại hàng: Dầu xả",
          number: "1",
          price_old: "200.000",
          price_new: "180.000",
        },
      ],
    },
    {
      id: 5,
      order_status: "Đã hủy",
      products: [
        {
          id: 201,
          product_title: "Dầu xả cho chó",
          product_description: "Phân loại hàng: Dầu xả",
          number: "1",
          price_old: "200.000",
          price_new: "180.000",
        },
      ],
    },
  ];

  return (
    <div style={{ padding: "20px 0" }} className={styles.main}>
      <div className="grid wide">
        <Row gutter={24}>
          <UserProfileComponent
            full_name={full_name}
            src_img={user_avt_img}
            user_name = {user_name}
            isInViewport={isInViewport}
            isInMobile={isInMobile}
            className={styles.profiles}
          />

          {/* Main Content */}
          <Col span={isInViewport || isInMobile ? 24 : 18} className={styles.tabs}>
            {/* Tabs */}
            <Tabs
              activeKey={currentTab}
              tabBarGutter={40}
              size="large"
              onChange={handleTabChange}
            >
              {Object.entries(menuTab).map(([key, label]) => (
                <TabPane tab={label} key={key} />
              ))}
            </Tabs>

            {/* Search Bar */}
            <Input.Search
              placeholder="Tìm kiếm theo tên Shop, ID đơn hàng hoặc tên sản phẩm"
              style={{ marginTop: "0px", marginBottom: "20px" }}
            />

            {orders
              .filter((order) => {
                if (currentTab === "1") return true; // Tất cả đơn hàng
                if (currentTab === "2") return order.order_status === "Chờ xác nhận";
                if (currentTab === "3") return order.order_status === "Đang vận chuyển";
                if (currentTab === "4") return order.order_status === "Hoàn thành";
                if (currentTab === "5") return order.order_status === "Đã hủy";
                if (currentTab === "6") return order.order_status === "Trả hàng/Hoàn tiền";
                return false;
              })
              .map((order) => (
                <Card className={styles.card} key={order.id}>
                  <Row className={styles.orderStatus}>
                    <Col span={24}>
                      <Text>
                        {order.order_status}
                      </Text>
                    </Col>
                  </Row>

                  {order.products.map((product) => (
                    <div onClick={() => handleProductClick(order.id)} style={{cursor: "pointer"}}>
                      <OrderCart
                        key={product.id}
                        {...product}
                      />
                    </div>
                  ))}

                  <Row className={styles.total}>
                    <Col span={21}>
                      <p>Thành tiền:</p>
                    </Col>
                    <Col span={3}>
                      <p className={styles.price}>
                        {order.products
                          .reduce(
                            (total, product) =>
                              total +
                              parseInt(product.price_new.replace(".", "")) *
                              parseInt(product.number),
                            0
                          )
                          .toLocaleString()}
                        đ
                      </p>
                    </Col>

                    <Col span={24} className={styles.allBtn}>
                      {order.order_status === "Hoàn thành" && (
                        <div className={styles.btnDetails}>
                          <ButtonComponent
                            title="Đánh giá"
                            primary
                            className={styles.btnPrimary}
                            widthDiv="none"
                            showIcon={false}
                            onClick={() => handleFeedBackClick(order.id)}
                          />
                          <ButtonComponent
                            title="Mua lại"
                            className={styles.btn}
                            widthDiv="none"
                            showIcon={false}
                          />
                        </div>
                      )}
                      {(order.order_status === "Đã hủy" ||
                        order.order_status === "Trả hàng/Hoàn tiền") && (
                          <ButtonComponent
                            title="Mua lại"
                            primary
                            className={styles.btnPrimary}
                            widthDiv="none"
                            showIcon={false}
                          />
                        )}
                      {order.order_status === "Chờ xác nhận" && (
                        <ButtonComponent
                          title="Hủy"
                          primary
                          className={styles.btnPrimary}
                          widthDiv="none"
                          showIcon={false}
                        />
                      )}
                    </Col>
                  </Row>
                </Card>
              ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MyOrderPage;