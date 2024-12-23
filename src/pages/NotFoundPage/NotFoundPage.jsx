import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundContainer}>
      <p className={styles.errorCode}>404</p>
      <p className={styles.errorMessage}>Trang bạn tìm kiếm không tồn tại</p>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Quay lại trang trước đó
      </button>
    </div>
  );
};

export default NotFoundPage;
