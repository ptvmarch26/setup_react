import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import Header2Component from '../Header2Component/Header2Component'
import FooterComponent from '../FooterComponent/FooterComponent'

const DefaultComponent = ({ children }) => {
  const location = useLocation();

  // Kiểm tra đường dẫn hiện tại để quyết định Header
  const useHeader2 = ['/sign-in', '/sign-up'].includes(location.pathname);
  const headerTitle = location.pathname === '/sign-in' ? 'Đăng nhập' : 'Đăng ký';
  return (
    <div>
       {useHeader2 ? <Header2Component title={headerTitle}/> : <HeaderComponent />}
      {children}
      <FooterComponent />
    </div>
  )
}

export default DefaultComponent