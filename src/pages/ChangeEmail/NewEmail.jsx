// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './ChangeEmail.module.scss'
// import './ChangeEmail.scss'
// import UserProfileComponent from '../../components/UserProfileComponent/UserProfileComponent'
// import { useSelector } from 'react-redux';
// import { Button, Form, Input } from 'antd';

// function NewEmail() {
//   const navigate = useNavigate();
//   const [form] = Form.useForm();
//   const [isFormFilled, setIsFormFilled] = useState(false);
//   const { _id, isAuthenticated, user_email, user_name, full_name, user_avt_img } = useSelector((state) => state.user);

//   const handleValuesChange = (changedValues, allValues) => {
//     if (allValues.newEmail && allValues.newEmail.trim() !== '') {
//       setIsFormFilled(true);
//     } else {
//       setIsFormFilled(false);
//     }
//   };

//   const handleSave = (values) => {
//     alert('Hãy xác thực email mới!');
//     navigate('/verification');
//   };

//   const handleCancel = () => {
//     navigate('/account/profile');
//   };

//   return (
//     <div className={styles.main}>
//       <div className="grid wide">
//         <div className={styles.wrapMain}>
//           <UserProfileComponent
//             full_name={full_name}
//             src_img={user_avt_img}
//             user_name={user_name}
//             className={styles.user}
//           />

//           <div className={styles.wrapInfo}>
//             <h2 className={styles.change}>Thêm email</h2>
//             <Form
//               layout="horizontal"
//               labelCol={{ span: 6 }}
//               wrapperCol={{ span: 18 }}
//               className={styles.form}
//               form={form}
//               onFinish={handleSave}
//               onValuesChange={handleValuesChange}
//             >
//               {/* Input email mới */}
//               <Form.Item
//                 label="Email mới"
//                 name="newEmail"
//                 rules={[
//                   { required: true, message: 'Nhập email mới!' },
//                   { type: 'email', message: 'Email không hợp lệ!' },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>

//               {/* Nút hành động */}
//               <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
//                 <div className={styles.btn}>
//                   <Button
//                     htmlType="reset"
//                     className={styles.cancelBtn}
//                     onClick={handleCancel}
//                   >
//                     Hủy
//                   </Button>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     className={styles.submitBtn}
//                     disabled={!isFormFilled}
//                     style={{
//                       backgroundColor: isFormFilled ? '#E87428' : '#d9d9d9',
//                       borderColor: isFormFilled ? '#E87428' : '#d9d9d9',
//                     }}
//                   >
//                     Xác nhận
//                   </Button>
//                 </div>
//               </Form.Item>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewEmail;
