import React from 'react'
import { Badge, Button, Col, Input, Row } from 'antd';
import { Link } from 'react-router-dom'
import styles from './HeaderComponent.module.scss'
import { GrNotification, GrLanguage } from 'react-icons/gr'
import { BiHelpCircle } from 'react-icons/bi'
import whiteLogo from '../../assets/images/whiteLogo.svg'
import { FaChevronDown, FaRegHeart } from 'react-icons/fa6'
import { PiShoppingCartBold } from 'react-icons/pi'
import { SearchOutlined } from '@ant-design/icons';
import MoreComponent from '../MoreComponent/MoreComponent';
import { TbHelpSquare } from "react-icons/tb";

const HeaderComponent = () => {
  return (
    <div className={styles.header}>
      <div className="container" style={{overflow: "hidden"}}>
        <div className={styles.logo}>
          <Link to={"/"}>
            <img src={whiteLogo} alt="" />
          </Link>
        </div>
        <Row className={styles.userOptions}>
          <Col span={16} offset={8}>
            <ul>
              <li>
                <Link to={"/"}>
                  <GrNotification />
                  <span>Thông báo</span>
                </Link>
              </li>
              <li>
                <Link to={"/"}>
                  <TbHelpSquare />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link to={"/sign-in"}>
                  <span>Đăng nhập</span>
                </Link>
              </li>
              <li>
                <Link to={"/sign-up"}>
                  <span>Đăng ký</span>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className={styles.search}>
          <Col span={12} offset={6}>
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              suffix={
                <Button 
                  className={styles.searchButton} 
                  icon={<SearchOutlined className={styles.icon}/>} 
                />
              }
            />
          </Col>
          <Col className={styles.cart} span={6}>
            <ul>
              <li>
                <Link>
                  <FaRegHeart />
                  <span>Yêu thích</span>
                </Link>
              </li>
              <li>
                <Link to={"/my-cart"}>
                  <PiShoppingCartBold />
                  <span>Giỏ hàng</span>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className={styles.nav} span={20} offset={2}>
          <ul>
            <li>
              <Link to={"/"}>
                Trang chủ
              </Link>
            </li>
            <li className={styles.forDog}>
              <Link>
                Sản phẩm cho chó
                <FaChevronDown className={styles.icon}/>
              </Link>
              <MoreComponent className={styles.moreDog} />
            </li>
            <li className={styles.forCat}>
              <Link>
                Sản phẩm cho mèo
                <FaChevronDown className={styles.icon}/>
              </Link>
              <MoreComponent className={styles.moreCat} />
            </li>
            <li>
              <Link to={"/about"}>
                  Về chúng tôi
              </Link>
            </li>       
          </ul>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default HeaderComponent