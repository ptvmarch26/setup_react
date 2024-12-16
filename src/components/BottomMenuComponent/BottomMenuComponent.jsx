import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./BottomMenuComponent.module.scss";
import { FaRegUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";

const BottomMenuComponent = ({ favorite }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const location = useLocation(); // Lấy đường dẫn hiện tại

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const isActive = (index, path) =>
        (index === hoveredIndex || location.pathname === path);

    return (
        <div className={styles.bottomMenu}>
            <Link
                to="/"
                className={`${styles.menuItem} ${isActive(0, "/") ? styles.active : ""}`}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
            >
                {isActive(0, "/") ? <IoHomeSharp /> : <IoHomeOutline />}
                <span>Trang chủ</span>
            </Link>
            <Link
                to="/notifications"
                className={`${styles.menuItem} ${isActive(1, "/notifications") ? styles.active : ""}`}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
            >
                {isActive(1, "/notifications") ? <IoMdNotifications /> : <IoIosNotificationsOutline />}
                <span>Thông báo</span>
            </Link>
            <Link
                to={`/${favorite}`}
                className={`${styles.menuItem} ${isActive(2, `/${favorite}`) ? styles.active : ""}`}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
            >
                {isActive(2, `/${favorite}`) ? <FaHeart /> : <FaRegHeart />}
                <span>Yêu thích</span>
            </Link>
            <Link
                to="/user-profile"
                className={`${styles.menuItem} ${isActive(3, "/user-profile") ? styles.active : ""}`}
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
            >
                {isActive(3, "/user-profile") ? <FaUser /> : <FaRegUser />}
                <span>Cá nhân</span>
            </Link>
        </div>
    );
};

export default BottomMenuComponent;
