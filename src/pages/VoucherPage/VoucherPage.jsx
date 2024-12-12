import React, { useEffect, useReducer, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import clsx from "clsx";
import styles from "./VoucherPage.module.scss";
import "./VoucherPage.scss";
import myAvatar from "../../assets/images/avatar.jpg";
import freeship from "../../assets/images/freeship.webp";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import UserProfileComponent from "../../components/UserProfileComponent/UserProfileComponent.jsx";
import { useSelector } from "react-redux";
import { getAllVoucher } from "../../services/Notification.service.js";
import { useQuery } from "@tanstack/react-query";
import { format } from 'date-fns';

const initVoucherData = {
  shipping: [
    {
      id: 1,
      code: "SHIPFREE20",
      description: "Miễn phí vận chuyển cho đơn trên 100k",
      expiration: "2024-12-31",
      minOrder: 100000,
      count: 50,
      image: freeship,
    },
    {
      id: 2,
      code: "SHIP30K",
      description: "Giảm 30k phí vận chuyển",
      expiration: "2024-12-25",
      minOrder: 200000,
      count: 2,
      image: freeship,
    },
  ],
  product: [
    {
      id: 3,
      code: "SAVE10",
      description: "Giảm 10% giá trị đơn hàng",
      expiration: "2024-12-20",
      minOrder: 150000,
      count: 0,
      image: freeship,
    },
    {
      id: 4,
      code: "DISCOUNT50",
      description: "Giảm 50k cho đơn hàng trên 300k",
      expiration: "2024-12-15",
      minOrder: 300000,
      count: 10,
      image: freeship,
    },
  ],
};
const VoucherPage = () => {
  const [vouchers, setVouchers] = useState(initVoucherData);
  const navigate = useNavigate();

  const { isAuthenticated, user_name, user_avt_img, _id, full_name } =
    useSelector((state) => state.user);

  const accessToken = localStorage.getItem("accessToken");

  // Hàm fetch dữ liệu từ API
  const fetchVoucherData = async () => {
    try {
      const voucher = await getAllVoucher();
      if (!voucher || !voucher.data) {
        throw new Error("No voucher data returned from API");
      }
      return voucher.data; // React Query tự động xử lý Promise này
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
      throw new Error("Failed to fetch cart data");
    }
  };

  // Sử dụng useQuery để gọi API
  const { data, isLoading, error } = useQuery({
    queryFn: fetchVoucherData,
    enabled: !!accessToken, // Chỉ chạy khi cả id và accessToken có giá trị
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  console.log("data trả về nè", data);
  // const allVoucherData = {
  // 	"shipping": data.shippingDiscounts,
  // 	"product": data.productDiscounts
  // }

  // Cập nhật cartItems khi data từ API thay đổi
  useEffect(() => {
    if (data) {
      const updatedVoucherData = {
        shipping: data.shippingDiscounts
          ? data.shippingDiscounts.map((item) => ({
              id: item._id,
              code: item.discount_code,
              description: item.discount_description,
              expiration:  format(new Date(item.discount_end_day), 'dd/MM/yyyy'),
              minOrder: item.discount_condition[0].price_total_order,
              count: item.discount_amount,
              image: freeship,
            }))
          : [],
        product: data.productDiscounts
          ? data.productDiscounts.map((item) => ({
              id: item._id,
              code: item.discount_code,
              description: item.discount_description,
              expiration: format(new Date(item.discount_end_day), 'dd/MM/yyyy'),
              minOrder: item.discount_condition[0].price_total_order,
              count: item.discount_amount,
              image: freeship,
            }))
          : [],
      };

      setVouchers(updatedVoucherData);
			console.log("data trả set lại", updatedVoucherData);
    }
  }, [data]);

  // Hàm xử lý các sự kiện
	
  const handleUseNow = () => {
    navigate("/get-all-product?category_level_1=Chó"); // Điều hướng đến trang đăng ký
  };

  return (
    <div className={styles.main}>
      <div className="grid wide">
        <Row gutter={16}>
          <UserProfileComponent
            full_name={full_name}
            src_img={user_avt_img}
            user_name={user_name}
            className={styles.user}
          />
          <Col span={18}>
            {Object.keys(vouchers).map((category) => (
              <div key={category} className={styles.category}>
                <h2>{category === "shipping" ? "Vận chuyển" : "Sản phẩm"}</h2>
                {vouchers[category].map((voucher) => (
                  <Card key={voucher.id} hoverable className={styles.card}>
                    <div className={styles.wrap}>
                      <div className={styles.img}>
                        <img
                          alt="Voucher"
                          src={voucher.image}
                          className={styles.voucherImage}
                        />
                      </div>
                      <div className={styles.info}>
                        <h3>{voucher.code}</h3>
                        <p>{voucher.description}</p>
                        <p>{voucher.expiration}</p>
                        <p>
                          Đơn tối thiểu: {voucher.minOrder.toLocaleString()} VNĐ
                        </p>
                        <p>Số lượng: {voucher.count}</p>
                      </div>
                      <div className={styles.wrapBtn}>
                        <ButtonComponent
                          title="Áp dụng"
                          className={clsx(styles.applyPriceBtn, {
                            [styles.shipping]: category === "shipping",
                          })}
                          showIcon={false}
                          fontSize="1.3rem"
                          borderRadius="none"
                          widthDiv="none"
                          primary
                          onClick={handleUseNow}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default VoucherPage;
