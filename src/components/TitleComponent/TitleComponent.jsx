import React from 'react'
import clsx from 'clsx'
import styles from './TitleComponent.module.scss'

const TitleComponent = ({ 
  title, 
  textTransform, 
  textAlign, 
  fontSize,
  className,
  fontWeight = "800",
  margin = "30px 0",
  color = "#000",
  ...props
}) => {
  return (
    <div 
      className={clsx(styles.title, className)}
      style={{
        textAlign:textAlign, 
        textTransform: textTransform, 
        margin: margin,
        ...props
      }}
    >
        <h2 style={{fontSize: fontSize, color: color, fontWeight: fontWeight}}>{title}</h2>
    </div>
  )
}

export default TitleComponent