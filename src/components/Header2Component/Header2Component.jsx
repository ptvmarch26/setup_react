import React from 'react'
import styles from './Header2Component.module.scss'
import whiteLogo from "../../assets/images/whiteLogo.svg";
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';

const Header2Component = ({title}) => {
  const navigate = useNavigate()

  const handleHome = () => {
    return navigate("/")
  }
  return (
    <div className={styles.main}>
      <div className={clsx('grid wide', styles.wrap)}>
        <div className={styles.logo}>
          <div className={styles.img} onClick={handleHome}>
            <img src={whiteLogo}/>
          </div>
          <h1>{title}</h1>
        </div>
        <div className={styles.support}>
          <Link to={"/faq"}>Bạn cần giúp đỡ?</Link>
        </div>
      </div>
    </div>
  )
}

export default Header2Component