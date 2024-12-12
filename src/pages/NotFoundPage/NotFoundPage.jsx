import React from 'react'
import styles from './NotFouldPage.module.scss'

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <p className={styles.errorCode}>404</p>
      <p className={styles.errorMessage}>Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className={styles.homeLink}>Go Back to Home</a>
    </div>
  );
}

export default NotFoundPage