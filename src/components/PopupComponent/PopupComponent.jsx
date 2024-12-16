import React, { useEffect } from "react";
import styles from "./PopupComponent.module.scss";
import success from '../../assets/images/success.png'
import fail from '../../assets/images/fail.png'
import { IoMdClose } from "react-icons/io";

const PopupComponent = ({ message, timeout, onClose, isSuccess = true }) => {
  // Tự động đóng popup sau thời gian timeout
  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(onClose, timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout, onClose]);

  return (
    <div>
      <div onClick={onClose} className={styles.popupOverlay}></div>
      <div className={styles.popup}>
        <img src={isSuccess ? success : fail} />
        <div className={styles.content}>
          <p>{message || "Đã xảy ra lỗi, vui lòng thử lại."}</p>
        </div>
        <button className={styles.close} onClick={onClose}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default PopupComponent;
