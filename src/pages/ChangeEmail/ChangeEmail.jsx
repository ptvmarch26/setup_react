import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ChangeEmail.css';
import ProfileUser from "../MyOrderPage/UserProfile.jsx";
import myAvatar from "../../assets/images/avatar.jpg";

import { Button, Form, Input } from 'antd';

const cx = classNames.bind(styles);

const initialData = {
  currentEmail: 'thanhhuyen@gmail.com.vn',
};

function ChangeEmail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Trạng thái kiểm tra đã nhập thông tin hay chưa
  const [isFormFilled, setIsFormFilled] = useState(false);

  // Hàm kiểm tra nếu có thay đổi trong form
  const handleValuesChange = (changedValues, allValues) => {
    // Kiểm tra nếu `newEmail` đã được nhập và không rỗng
    if (allValues.newEmail && allValues.newEmail.trim() !== '') {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  };

  const handleSave = (values) => {
    alert('Email đã được cập nhật!');
    navigate('/account-info');
  };

  const handleCancel = () => {
    navigate('/account-info');
  };

  return (
    <div style={{ margin: "0 auto", padding: "20px" }} className={cx('container')}>
      <div className="profile-container">
        <ProfileUser
          full_name="Nguyễn Lê Thanh Huyền"
          src_img={myAvatar}
          name="yurri_2506"
        />

        <div className={cx('content')}>
          <span className={cx('header')}>Đổi Email</span>
          <Form
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            className={cx('form')}
            form={form}
            initialValues={initialData}
            onFinish={handleSave}
            onValuesChange={handleValuesChange} // Theo dõi thay đổi trong form
          >
            <Form.Item
              label="Email hiện tại"
              name="currentEmail"
            >
              <Input disabled value={initialData.currentEmail} />
            </Form.Item>

            <Form.Item
              label="Email mới"
              name="newEmail"
              rules={[
                { required: true, message: 'Nhập email mới!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button
                htmlType="reset"
                className={cx('cancel-button')}
                onClick={handleCancel}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className={cx('confirm-button')}
                disabled={!isFormFilled} // Nút xác nhận bị vô hiệu hóa nếu không nhập
                style={{
                  backgroundColor: isFormFilled ? '#E87428' : '#d9d9d9',
                  borderColor: isFormFilled ? '#E87428' : '#d9d9d9',
                }}
              >
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ChangeEmail;