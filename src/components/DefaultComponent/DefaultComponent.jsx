import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import Header2Component from '../Header2Component/Header2Component'
import FooterComponent from '../FooterComponent/FooterComponent'
import BreadcrumbComponent from '../BreadcrumbComponent/BreadcrumbComponent';

const DefaultComponent = ({ children }) => {
  const location = useLocation();

  // Kiểm tra đường dẫn hiện tại để quyết định Header
  const useHeader2 = ['/sign-in', '/sign-up', '/reset'].includes(location.pathname);
  let headerTitle = '';
  let needHelp = true;
  switch (location.pathname) {
    case '/sign-in':
      headerTitle = 'Đăng nhập';
      break;
    case '/sign-up':
      headerTitle = 'Đăng ký';
      break;
    case '/reset':
      headerTitle = 'Quên mật khẩu';
      needHelp = false
      break;
    default:
      headerTitle = '';
  }
  // const headerTitle = location.pathname === '/sign-in' ? 'Đăng nhập' : 'Đăng ký';
  return (
    <div>
       {useHeader2 ? <Header2Component title={headerTitle} needHelp={needHelp}/> : <HeaderComponent />}
       <BreadcrumbComponent />
      {children}
      <FooterComponent />
    </div>
  )
}

export default DefaultComponent