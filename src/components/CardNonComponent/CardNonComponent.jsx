import React from 'react'
import { IoIosStar } from "react-icons/io"
import styles from './CardNonComponent.module.scss'

const CardNonComponent = ({ src, alt, name, oldPrice, newPrice, start, percent}) => {
  return (
    <div className={styles.product}>
        <div className={styles.img}>
            <img src={src} alt={alt} />
        </div>
        <div className={styles.info}>
            <div className={styles.price}>
                <span className={styles.new}>{newPrice?.toLocaleString()}VNĐ</span>
                <span className={styles.old}>{oldPrice?.toLocaleString()}VNĐ</span>
            </div>
            <div className={styles.star}>
                <IoIosStar className={styles.icon}/>
                <IoIosStar className={styles.icon}/>
                <IoIosStar className={styles.icon}/>
                <IoIosStar className={styles.icon}/>
                <IoIosStar className={styles.icon}/>
                <span>{start}</span>
            </div>
            <div className={styles.percent}>
                <span>-{percent}%</span>
            </div>
        </div>  
    </div>
  )
}

export default CardNonComponent