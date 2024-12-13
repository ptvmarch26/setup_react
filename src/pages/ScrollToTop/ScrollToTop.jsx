import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Hook để lấy thông tin về location của route hiện tại

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Khi location thay đổi (nghĩa là khi người dùng chuyển trang)
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  }, [location]); // Chạy mỗi khi location thay đổi

  return null;
};

export default ScrollToTop;
