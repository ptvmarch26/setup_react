import React from 'react'
import styles from './AboutMeComponent.module.scss'

const AboutMeComponent = ({avt, aboutTitle, aboutPara, isReverse = false, linear}) => {
  return (
    <div className={styles.main} style={isReverse ? {flexDirection: "row-reverse"} : null}>
        <div className={styles.img} style={{ background: linear }}>
            <img src={avt} alt="" />
        </div>
        <div className={styles.aboutMore}>
            <h3>{aboutTitle}</h3>
            <p dangerouslySetInnerHTML={{ __html: aboutPara }}></p>
        </div>
    </div>
  )
}

export default AboutMeComponent