// import React, { useReducer } from "react";
// import { Button, Card, Col, Row } from "antd";
// import clsx from "clsx";
// import styles from "./VoucherPage.module.scss";
// import ProfileUser from "../MyOrderPage/UserProfile.jsx";
// import myAvatar from "../../assets/images/avatar.jpg";

// const initVoucherData = [
//     {
//         id: 1,
//         code: "SHIPFREE20",
//         description: "Miễn phí vận chuyển cho đơn trên 100k",
//         expiration: "2024-12-31",
//         minOrder: 100000,
//         count: 50,
//         productRequirement: null,
//         image: "https://example.com/voucher1.jpg",
//     },
//     {
//         id: 2,
//         code: "SALE20",
//         description: "Giảm 20% cho đơn trên 300k",
//         expiration: "2024-12-31",
//         minOrder: 300000,
//         count: 10,
//         productRequirement: "Áp dụng cho tất cả sản phẩm",
//         image: "https://example.com/voucher2.jpg",
//     },
//     {
//         id: 3,
//         code: "DISCOUNT50",
//         description: "Giảm 50k cho đơn trên 500k",
//         expiration: "2024-12-31",
//         minOrder: 500000,
//         count: 0, // Hết số lượng
//         productRequirement: null,
//         image: "https://example.com/voucher3.jpg",
//     },
// ];

// const voucherReducer = (state, action) => {
//     switch (action.type) {
//         case "USE_VOUCHER":
//             return state.map((voucher) =>
//                 voucher.id === action.payload && voucher.count > 0
//                     ? { ...voucher, count: voucher.count - 1 }
//                     : voucher
//             );
//         default:
//             return state;
//     }
// };

// const VoucherPage = () => {
//     const [vouchers, dispatch] = useReducer(voucherReducer, initVoucherData);

//     const handleVoucher = (id) => {
//         dispatch({ type: "USE_VOUCHER", payload: id });
//     };

//     return (
//         <div className="grid wide">
//             <Row gutter={16}>
//                 <ProfileUser
//                     full_name="Nguyễn Lê Thanh Huyền"
//                     src_img={myAvatar}
//                     name="yurri_2506"
//                 />
//                 <Col span={18}>
//                     {vouchers.map((voucher) => (
//                         <Card
//                             key={voucher.id}
//                             hoverable
//                             cover={
//                                 <img
//                                     alt="Voucher"
//                                     src={voucher.image}
//                                     className={styles.voucherImage}
//                                 />
//                             }
//                         >
//                             <h3>{voucher.description}</h3>
//                             <p>Mã: {voucher.code}</p>
//                             <p>HSD: {voucher.expiration}</p>
//                             <p>Đơn tối thiểu: {voucher.minOrder.toLocaleString()} VNĐ</p>
//                             <p>Số lượng còn lại: {voucher.count}</p>
//                             <Button
//                                 onClick={() => handleVoucher(voucher.id)}
//                                 disabled={voucher.count === 0}
//                                 className={clsx(styles.useButton, {
//                                     [styles.disabledButton]: voucher.count === 0,
//                                 })}
//                             >
//                                 {voucher.count > 0 ? "Sử dụng" : "Hết số lượng"}
//                             </Button>
//                         </Card>
//                     ))}
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default VoucherPage;
