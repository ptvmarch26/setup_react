import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./CheckOutPage.module.scss";
import { FaLocationDot } from "react-icons/fa6";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import UnderLineComponent from "../../components/UnderLineComponent/UnderLineComponent";
import momo from "../../assets/images/momo.svg";
import visa from "../../assets/images/visa.svg";
import applePay from "../../assets/images/applePay.svg";
import SelectAddressComponent from "../../components/SelectAddressComponent/SelectAddressComponent";
import VoucherComponent from "../../components/VoucherComponent/VoucherComponent";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { createOrder, getAllDiscounts, previewOrder } from "../../services/Order.service";
import PopupComponent from "../../components/PopupComponent/PopupComponent";

const CheckOutPage = () => {
  const { user_address, _id } = useSelector((state) => state.user);
  const defaultAddress =
    user_address.find((address) => address.isDefault) || user_address[0]; // Fallback về địa chỉ đầu tiên nếu không có `isDefault: true`
  const [previewData, setPreviewData] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState("");

  const handlePaymentMethod = (method) => {
    setSelectedPaymentMethod((prevMethod) => (prevMethod === method ? null : method));
  };
  
  const navigate = useNavigate();
  // Tạo địa chỉ mặc định cho state
  const initAddress = {
    name: defaultAddress?.name,
    phone: defaultAddress?.phone,
    home_address: defaultAddress?.home_address,
    district: defaultAddress?.district,
    commune: defaultAddress?.commune,
    province: defaultAddress?.province,
  };

  const location = useLocation();
  const {
    cartItems = [],
    checkedItems = [],
    discount = 0,
    selectedAddress = {},
    shippingFee = 0,
    selectedVouchers = {},
  } = location.state || {};
  const selectedItems = cartItems.filter((item) =>
    checkedItems.includes(item.id)
  );

  const totalItemsPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [paymentMethod, setPaymentMethod] = useState("cod")

  const totalAmount = Math.max(0, totalItemsPrice + shippingFee);

  const [selectAddress, setSelectAddress] = useState(initAddress);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    const fetchPreviewOrder = async () => {
      const previewOrderData = {
        discount_ids: [
          selectedVouchers.shipping?.id,
          selectedVouchers.product?.id,
        ].filter(Boolean),
        user_id: _id,
        shipping_fee: shippingFee,
        shipping_address: {
          full_name: selectAddress?.name,
          phone: selectAddress?.phone,
          address: {
            home_address: selectAddress?.home_address,
            province: selectAddress?.province,
            district: selectAddress?.district,
            commune: selectAddress?.commune,
          },
        },
        products: selectedItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          variant: item.id,
          product_order_type: item.product_order_type,
          product_price: item.price,
        })),
        order_payment: paymentMethod,
      };

      try {
        const previewResponse = await previewOrder(previewOrderData);
        setPreviewData(previewResponse.data);
      } catch (error) {
        console.error("Error previewing order:", error.message);
      }
    };

    fetchPreviewOrder();
  }, [selectAddress, selectedVouchers, selectedItems, _id, shippingFee, paymentMethod]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true); // Mở modal
  };

  const closeModal = () => setIsModalOpen(false);

  const [selectedVoucher, setSelectedVoucher] = useState({
    shipping: selectedVouchers.shipping,
    product: selectedVouchers.product,
  });

  const [appliedVouchers, setAppliedVouchers] = useState({
    shipping: null,
    product: null,
  });

  const handleVoucherSelection = (voucher, type) => {
    setSelectedVoucher((prev) => ({
      ...prev,
      [type]: prev[type]?.id === voucher.id ? null : voucher,
    }));
  };

  const applyVouchers = () => {
    setAppliedVouchers(selectedVouchers);
  };

  const handleAddressChange = (newAddress) => {
    setSelectAddress(newAddress); // Cập nhật địa chỉ mới
  };

  const handleCheckOut = async () => {
    const orderData = {
      discount_ids: [
        selectedVouchers.shipping?.id,
        selectedVouchers.product?.id,
      ].filter(Boolean),
      user_id: _id,
      shipping_fee: shippingFee,
      shipping_address: {
        full_name: selectAddress.name,
        phone: selectAddress.phone,
        address: {
          home_address: selectAddress?.home_address,
          province: selectAddress?.province,
          district: selectAddress?.district,
          commune: selectAddress?.commune,
        },
      },
      products: selectedItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        variant: item.id,
        product_order_type: item.product_order_type,
        product_price: item.price,
      })),
      order_payment: paymentMethod,
      order_note: "Giao hàng ngoài giờ hành chính",
    };

    try {
      const orderResponse = await createOrder(orderData);
      setMessage("Đặt hàng thành công");
      setIsPopupVisible(true);
      setIsSuccess(true);
      console.log("Order Response:", orderResponse);
      setTimeout(() => {
        navigate(`/my-order`);
      }, 2000);
    } catch (error) {
      console.error("Error creating order:", error.message);
      setMessage("Có lỗi xảy ra khi cập nhật giỏ hàng. Vui lòng thử lại.");
      setIsPopupVisible(true);
      setIsSuccess(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className="grid wide">
        <h2>Thanh toán</h2>

        <div className={styles.address}>
          <div className={styles.title}>
            <FaLocationDot
              style={{
                color: "#E87428",
                fontSize: "1.5rem",
                marginBottom: "4px",
              }}
            />
            <h3>Thông tin nhận hàng</h3>
          </div>
          <div className={styles.infoAddress}>
            <p>Tên: {selectAddress?.name}</p>
            <p>Số điện thoại: {selectAddress?.phone}</p>
            <div className={styles.info}>
              <p>
                Đia chỉ: {selectAddress?.home_address},{" "}
                {selectAddress?.commune},{" "}
                {selectAddress?.district},{" "}
                {selectAddress?.province}
              </p>
              <div className={styles.change}>
                {/* <span>Mặc định</span> */}
                <Link onClick={openModal}>
                  Thay đổi
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* {isModalOpen && (
          <SelectAddressComponent closeModal={closeModal} _id={_id} />
        )} */}
        {isModalOpen && (
          <SelectAddressComponent
            closeModal={closeModal}
            _id={_id}
            onAddressChange={handleAddressChange} // Truyền callback xuống
          />
        )}

        <div className={styles.productCheckOut}>
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.img} alt="" />
                    <span>{item.name}</span>
                    <p>Loại: {item.product_order_type}</p>
                  </td>
                  <td>{item.price.toLocaleString("vi-VN")}₫</td>
                  <td>{item.quantity}</td>
                  <td>
                    {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.discount}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3>Mã giảm giá</h3>
            {/* <Link onClick={openVoucherModal}>Chọn voucher khác</Link> */}
            <VoucherComponent
              onVoucherSelect={handleVoucherSelection}
              selectedVouchers={selectedVouchers}
              applyVouchers={applyVouchers}
              isCheckout={true}
            />
          </div>
          <ul>
            {selectedVoucher.shipping && (
              <li>
                {selectedVoucher.shipping.code}
                <span>- {selectedVoucher.shipping.number?.toLocaleString()}%</span>
              </li>
            )}
            {selectedVoucher.product && (
              <li>
                {selectedVoucher.product.code}
                <span>- {selectedVoucher.product.number?.toLocaleString()}%</span>
              </li>
            )}
          </ul>
        </div>
        <div className={styles.payment}>
          <h3>Phương thức thanh toán</h3>
          <div className={clsx(styles.method, "row")}>
            <div className="col l-3 m-6 c-6">
              <ButtonComponent
                title="Momo"
                iconSmall
                icon={momo}
                margin="30px 0 0"
                width="220px"
                height="80px"
                className={`${styles.methodBtn} ${selectedPaymentMethod === "momo" ? styles.selected : ""}`}
                onClick={() => handlePaymentMethod("momo")}
              />
            </div>
            <div className="col l-3 m-6 c-6">
              <ButtonComponent
                title="Thẻ tín dụng/ghi nợ"
                iconSmall
                icon={visa}
                margin="30px 0 0"
                width="220px"
                height="80px"
                className={`${styles.methodBtn} ${selectedPaymentMethod === "credit_card" ? styles.selected : ""}`}
                onClick={() => handlePaymentMethod("credit_card")}
              />
            </div>
            <div className="col l-3 m-6 c-6">
              <ButtonComponent
                title="ApplePay"
                iconSmall
                icon={applePay}
                margin="30px 0 0"
                width="220px"
                height="80px"
                className={`${styles.methodBtn} ${selectedPaymentMethod === "apple_pay" ? styles.selected : ""}`}
                onClick={() => handlePaymentMethod("apple_pay")}
              />
            </div>
            <div className="col l-3 m-6 c-6">
              <ButtonComponent
                title="Thanh toán khi nhận hàng"
                iconSmall
                margin="30px 0 0"
                width="220px"
                height="80px"
                showIcon={false}
                className={`${styles.methodBtn} ${selectedPaymentMethod === "cod" ? styles.selected : ""}`}
                onClick={() => handlePaymentMethod("cod")}
              />
            </div>
            {/* <ButtonComponent 
              title="Momo"
              iconSmall
              icon={momo}
              margin="30px 0 0"
              width="220px"
              height="80px"
            />
            <ButtonComponent 
              title="Thẻ tín dụng/ghi nợ"
              iconSmall
              icon={visa}
              margin="30px 0 0"
              width="220px"
              height="80px"
            />
            <ButtonComponent 
              title="ApplePay"
              iconSmall
              icon={applePay}
              margin="30px 0 0"
              width="220px"
              height="80px"
            />
            <ButtonComponent 
              title="Thanh toán khi nhận hàng"
              iconSmall
              margin="30px 0 0"
              width="220px"
              height="80px"
              showIcon={false}
            /> */}
          </div>
        </div>

        <div className={styles.sumary}>
          <h3>Tổng kết</h3>
          <div className={styles.total}>
            <p className={styles.normal}>
              Tổng tiền hàng:
              <span>{(totalItemsPrice + discount).toLocaleString("vi-VN")}₫</span>
            </p>
            <p className={styles.normal}>
              Tổng tiền phí vận chuyển:
              <span>{shippingFee.toLocaleString("vi-VN")}₫</span>
            </p>
            <p className={styles.normal}>
              Tổng cộng mã giảm giá:
              <span>-{discount.toLocaleString("vi-VN")}₫</span>
            </p>
            <p className={styles.final}>
              Tổng thanh toán:
              <span>{previewData?.order_total_after?.toLocaleString("vi-VN")}₫</span>
            </p>
          </div>
          <UnderLineComponent
            width="100%"
            height="1px"
            background="rgba(0, 0, 0, 0.1"
            margin="20px 0"
          />
          <ButtonComponent
            title="Đặt hàng"
            width="500px"
            primary
            margin="30px 0"
            showIcon={false}
            onClick={handleCheckOut}
          />
        </div>
      </div>
      {isPopupVisible && (
        <PopupComponent
          message={message}
          onClose={() => setIsPopupVisible(false)}
          timeout={2000}
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
};
export default CheckOutPage;
