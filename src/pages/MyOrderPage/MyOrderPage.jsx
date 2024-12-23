import React, { useEffect, useState } from "react";
import { Tabs, Input, Card, Button, Typography, Row, Col, message } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./MyOrderPage.scss";
import styles from './MyOrderPage.module.scss'
import OrderCart from  "./OrderCart.jsx";
import { useSelector } from "react-redux";
import myAvatar from "../../assets/images/avatar.jpg";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent.jsx";
import UserProfileComponent from "../../components/UserProfileComponent/UserProfileComponent.jsx";
import clsx from "clsx";
import { changeStatus, getOrdersByStatus } from "../../services/Order.service.js";

const { TabPane } = Tabs;
const { Text } = Typography;

const MyOrderPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "1";
  const [orders, setOrders] = useState([]); // Định dạng kiểu { id: data }
  const [loading, setLoading] = useState(true);

  const menuTab = {
    1: "Tất cả",
    2: "Chờ xác nhận",
    3: "Đang giao",
    4: "Hoàn thành",
    5: "Hủy hàng",
    6: "Hoàn hàng",
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

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orderStatus = menuTab[currentTab];
        const response = await getOrdersByStatus(orderStatus, _id); 
        console.log("du lieu tra ve",response )
        // Map dữ liệu trả về và gán lại các trường
        const processedOrders = response.data.reverse().map((order) => ({
          id: order?._id, // ID của đơn hàng
          order_status: order?.order_status,
          total_price: order?.order_total_after,// Tính tổng tiền
          shipping_address: order?.shipping_address,
          order_payment: order?.order_payment,
          is_feedback: order?.is_feedback,
          products: order?.products?.map((product) => ({
            id: product?.product_id?._id,
            product_title: product?.product_id?.product_title,
            product_description: product?.product_order_type,
            number: product?.quantity,
            src_img: `${product?.product_id?.product_images[0]}`|| "",
            price_old: product?.product_price || 0,
            price_new: (product?.product_price*(1-product?.product_id?.product_percent_discount/100)).toLocaleString() || 0,
          })),
        }));

        setOrders(processedOrders); // Lưu dữ liệu đã xử lý vào state
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentTab, _id]);

  const handleProductClick = (orderId) => {
    const selectedOrder = orders.find((order) => order.id === orderId);
    
    if (selectedOrder) {
      navigate(`/order-details?tab=${currentTab}&product=${orderId}`, {
        state: { order: selectedOrder }, // Chỉ truyền đơn hàng có id = orderId
      });
    } else {
      console.error(`Order with ID ${orderId} not found.`);
      alert("Không tìm thấy đơn hàng!");
    }
  };

  const handleFeedBackClick = (orderId) => {
    const selectedOrder = orders.find((order) => order.id === orderId);
  
    if (selectedOrder) {
      navigate(`/product-feedback?tab=${currentTab}&product=${orderId}`, {
        state: { order: selectedOrder }, // Chỉ truyền đơn hàng có id = orderId
      });
    } else {
      console.error(`Order with ID ${orderId} not found.`);
      alert("Không tìm thấy đơn hàng!");
    }
  };

  const handleCancelOrder = async (orderId) => {
    const selectedOrder = orders.find((order) => order.id === orderId);
  
    if (selectedOrder) {
      // Hiển thị hộp thoại xác nhận trước khi hủy đơn hàng
      const confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
      if (confirmCancel) {
        try {
          // Gọi API để hủy đơn hàng
          await changeStatus(orderId);
          message.success("Hủy đơn hàng thành công!");
        } catch (error) {
          // Hiển thị thông báo lỗi nếu có vấn đề
          message.error("Hủy đơn hàng thất bại. Vui lòng thử lại!");
        }
      } else {
        // Người dùng chọn không hủy đơn hàng
        message.info("Đơn hàng không bị hủy.");
      }
    } else {
      console.error(`Order with ID ${orderId} not found.`);
      alert("Không tìm thấy đơn hàng!");
    }
  };
  
  return (
    <div style={{ padding: "20px 0" }} className={clsx('MyOrderPage_main__Rrmsc', styles.main)}>
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
                if (currentTab === "5") return order.order_status === "Hủy hàng";
                if (currentTab === "6") return order.order_status === "Trả hàng/Hoàn tiền";
                return false;
              })
              .map((order) => (
                <Card className={clsx('MyOrderPage_card__5Ni41', styles.card)} key={order.id}>
                  <Row className={styles.orderStatus}>
                    <Col span={24}>
                      <Text>
                        {order?.order_status}
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

                  <Row className={clsx('MyOrderPage_total__EhPp1', styles.total)}>
                    <Col span={21}>
                      <p>Thành tiền:</p>
                    </Col>
                    <Col span={3}>
                      <p className={styles.price}>
                        {order.total_price.toLocaleString()}
                        đ
                      </p>
                    </Col>

                    <Col span={24} className={styles.allBtn}>
                      {order?.order_status === "Hoàn thành" && (
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
                      {(order?.order_status === "Hủy hàng" ||
                        order?.order_status === "Trả hàng/Hoàn tiền") && (
                          <ButtonComponent
                            title="Mua lại"
                            primary
                            className={styles.btnPrimary}
                            widthDiv="none"
                            showIcon={false}
                          />
                        )}
                      {order?.order_status === "Chờ xác nhận" && (
                        <ButtonComponent
                          title="Hủy"
                          primary
                          className={styles.btnPrimary}
                          widthDiv="none"
                          showIcon={false}
                          onClick={() => handleCancelOrder(order.id)}
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