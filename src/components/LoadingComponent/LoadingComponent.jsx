// import React from 'react';
// import styles from './LoadingComponent.module.scss';
// import { Spin } from 'antd';

// const LoadingComponent = ({ children, isLoading, deday = 200 }) => {
//   return (
//     <Spin spinning={isLoading} delay={deday}>
//       {children}
//     </Spin>
//   );
// };

// export default LoadingComponent;

import React from "react";
import styles from "./LoadingComponent.module.scss";

const LoadingComponent = ({ children, isLoading, delay = 200 }) => {
  return (
    <div style={{ position: "relative" }}>
      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <div style={{ opacity: isLoading ? 0.7 : 1, transition: "opacity 0.3s" }}>
        {children}
      </div>
    </div>
  );
};

export default LoadingComponent;


