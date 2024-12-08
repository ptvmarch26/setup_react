import React from 'react';
import styles from './LoadingComponent.module.scss';
import loadingImg from '../../assets/images/loading.webp'; // Đảm bảo đường dẫn đúng

import { Spin } from 'antd';

const LoadingComponent = ({ children, isLoading, deday = 200 }) => {
  const customSpin = (
    <img src={loadingImg} alt="Loading dog" className={styles.dogSpinner} />
  );
// indicator={customSpin}
  return (
    <Spin spinning={isLoading} delay={deday}>
      {children}
    </Spin>
  );
};

export default LoadingComponent;
