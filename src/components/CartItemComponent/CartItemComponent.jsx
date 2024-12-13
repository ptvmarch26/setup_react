import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import styles from './CartItemComponent.module.scss'
import clsx from 'clsx';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import cart from '../../assets/images/cart.svg'

const CartItemComponent = ({ item, onQuantityChange, onRemove, onCheck, isChecked, isLike = false, isInMobile, onClick }) => {
  return (
    <div className={styles.carts}>
      <div>
        <input
          type="checkbox"
          onChange={() => onCheck(item.id)}
          checked={isChecked}
        />
      </div>
      <div className={styles.img} onClick={onClick}>
        <img src={item.img} alt={item.name} />
      </div>
      <div className={clsx(styles.details, { [styles.detailsLike]: isLike })} onClick={onClick}>
        <p>{item.name}</p>
        {item.product_order_type? (<p className={styles.type}>Loại: {item.product_order_type}</p>) : []}
        <div className={styles.price}>
          <p>{isInMobile ? 'đ' : ''}{item.oldPrice.toLocaleString()}{isInMobile ? '' : 'VNĐ'}</p>
          <p>{isInMobile ? 'đ' : ''}{item.price.toLocaleString()}{isInMobile ? '' : 'VNĐ'}</p>
        </div>
      </div>
      <div className={clsx(styles.changeItem, { [styles.changeItemLike]: isLike })}>
        <button onClick={() => onRemove(item.id)}>
          <FaRegTrashAlt />
        </button>
        {isLike ? (
          <ButtonComponent
            title="Thêm vào giỏ"
            fontSize={isInMobile ? "1rem" : "1.2rem"}
            width="200px"
            height="50px"
            widthDiv="none"
            icon={cart}
            className={styles.btnAdd}
          />
        ) : (
          <div className={styles.quantity}>
            <button onClick={() => onQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItemComponent