// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import styles from './BreadcrumbComponent.module.scss';
// import { useParams } from "react-router-dom";
// import clsx from 'clsx';

// const BreadcrumbComponent = () => {
//     const location = useLocation();
//     const { id } = useParams();

//     const pathNames = {
//         '/about': { label: 'Về chúng tôi', background: '#FFF9E3' },
//         '/privacy-policy': { label: 'Chính sách bảo mật' },
//         '/guarantee': { label: 'Chính sách bảo hành'},
//         '/order-details': {
//             label: [
//                 { label: 'Lịch sử đơn hàng', path: '/my-order' },
//                 { label: 'Chi tiết đơn hàng', path: '/order-details' },
//             ], background: '#f5f5f5' 
//         },
//         '/product-feedback': {
//             label: [
//                 { label: 'Lịch sử đơn hàng', path: '/my-order' },
//                 { label: 'Đánh giá đơn hàng', path: '/product-feedback' },
//             ], background: '#f5f5f5' 
//         },
//         '/return-policy': { label: 'Chính sách trả hàng và hoàn tiền' },
//         '/account/edit-info': {
//             label: [
//                 { label: 'Trang cá nhân', path: '/account/profile' },
//                 { label: 'Cập nhật thông tin', path: '/account/edit-info' },
//             ],
//         },
//         '/notifications': { label: 'Thông báo' },
//         '/my-order': { label: 'Lịch sử đơn hàng' },
//         '/voucher': { label: 'Kho voucher' },
//         '/account/profile': { label: 'Trang cá nhân' },
//         '/account/edit-email': { label: 'Thông tin cá nhân' },
//         '/account/edit-phone': { label: 'Thông tin cá nhân' },
//         '/account/edit-address': { label: 'Thông tin cá nhân' },
//         '/account/edit-password': { label: 'Thông tin cá nhân' },
//         '/get-all-product': { label: 'Danh mục sản phẩm' },
//         '/my-cart': { label: 'Giỏ hàng' },
//         '/check-out': {
//             label: [
//                 { label: id ? `Giỏ hàng` : null, path: `/my-cart/${id}` },
//                 { label: 'Thanh toán', path: '/check-out' },
//             ],
//         },
//         '/favorite-products': { label: 'Sản phẩm yêu thích' },
//         '/product-details': { label: 'Chi tiết sản phẩm' },
//         '/help-center': { label: 'Trung tâm trợ giúp' },
//         '/privacy-policy': { label: 'Chính sách bảo mật' },
//         '/general-terms': { label: 'Điều khoản chung' },
//         '/guarantee': { label: 'Chính sách bảo hành' },
//         '/return-policy': { label: 'Chính sách trả hàng và hoàn tiền' },
//         '/faq': { label: 'FAQ' },
//     };

//     const paths = location.pathname.split('/').filter((path) => path);

//     const matchedPaths = [];
//     paths.reduce((currentPath, path) => {
//         const fullPath = `${currentPath}/${path}`;
//         const matchedPath = Object.keys(pathNames).find((key) =>
//             fullPath.startsWith(key)
//         );

//         if (matchedPath && !matchedPaths.includes(matchedPath)) {
//             matchedPaths.push(matchedPath);
//         }

//         return fullPath;
//     }, '');

//     const processedPaths = matchedPaths.reduce((acc, path) => {
//         const { label, background } = pathNames[path];

//         if (Array.isArray(label)) {
//             // Nếu label là mảng, thêm từng phần vào breadcrumb
//             label.forEach((item) => {
//                 acc.push({
//                     path: item.path,
//                     label: item.label,
//                     background: pathNames[item.path]?.background,
//                 });
//             });
//         } else {
//             acc.push({
//                 path,
//                 label,
//                 background, // Thêm background vào item
//             });
//         }

//         return acc;
//     }, []);

//     if (processedPaths.length === 0) {
//         return null;
//     }

//     // Lấy background từ path hiện tại
//     const currentBackground = processedPaths[processedPaths.length - 1]?.background || '';

//     return (
//         <div className={clsx(styles.main)} style={{background: currentBackground}}>
//             <div className={`grid wide`}>
//                 <nav className={styles.breadcrumb}>
//                     <ol>
//                         <li>
//                             <Link to="/">Trang chủ</Link>
//                         </li>
//                         {processedPaths.map((breadcrumb, index) => {
//                             const isLast = index === processedPaths.length - 1;

//                             return isLast ? (
//                                 <li key={breadcrumb.path} className={styles.active}>
//                                     {breadcrumb.label}
//                                 </li>
//                             ) : (
//                                 <li key={breadcrumb.path}>
//                                     <Link to={breadcrumb.path}>
//                                         {breadcrumb.label}
//                                     </Link>
//                                 </li>
//                             );
//                         })}
//                     </ol>
//                 </nav>
//             </div>
//         </div>
//     );
// };

// export default BreadcrumbComponent;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './BreadcrumbComponent.module.scss';
import { useParams } from "react-router-dom";
import clsx from 'clsx';

const BreadcrumbComponent = () => {
    const location = useLocation();
    const { id } = useParams();

    const pathNames = {
        '/about': { label: 'Về chúng tôi', background: '#FFF9E3' },
        '/privacy-policy': { label: 'Chính sách bảo mật' },
        '/guarantee': { label: 'Chính sách bảo hành' },
        '/order-details': {
            label: [
                { label: 'Lịch sử đơn hàng', path: '/my-order' },
                { label: 'Chi tiết đơn hàng', path: '/order-details' },
            ],
            background: '#f5f5f5',
        },
        '/product-feedback': {
            label: [
                { label: 'Lịch sử đơn hàng', path: '/my-order' },
                { label: 'Đánh giá đơn hàng', path: '/product-feedback' },
            ],
            background: '#f5f5f5',
        },
        '/return-policy': { label: 'Chính sách trả hàng và hoàn tiền' },
        '/account/edit-info': {
            label: [
                { label: 'Trang cá nhân', path: '/account/profile' },
                { label: 'Cập nhật thông tin', path: '/account/edit-info' },
            ],
        },
        '/notifications': { label: 'Thông báo' },
        '/my-order': { label: 'Lịch sử đơn hàng' },
        '/voucher': { label: 'Kho voucher' },
        '/account/profile': { label: 'Trang cá nhân' },
        '/account/edit-email': { label: 'Thông tin cá nhân' },
        '/account/edit-phone': { label: 'Thông tin cá nhân' },
        '/account/edit-address': { label: 'Thông tin cá nhân' },
        '/account/edit-password': { label: 'Thông tin cá nhân' },
        // '/get-all-product': { label: 'Danh mục sản phẩm' },
        '/my-cart': { label: 'Giỏ hàng' },
        '/check-out': {
            label: [
                { label: id ? `Giỏ hàng` : null, path: `/my-cart/${id}` },
                { label: 'Thanh toán', path: '/check-out' },
            ], background: '#FAFAF8'
        },
        '/favorite-products': { label: 'Sản phẩm yêu thích' },
        '/product-details': { label: 'Chi tiết sản phẩm' },
        '/help-center': { label: 'Trung tâm trợ giúp' },
        '/privacy-policy': { label: 'Chính sách bảo mật' },
        '/general-terms': { label: 'Điều khoản chung' },
        '/guarantee': { label: 'Chính sách bảo hành' },
        '/return-policy': { label: 'Chính sách trả hàng và hoàn tiền' },
        '/faq': { label: 'FAQ' },
    };

    const paths = location.pathname.split('/').filter((path) => path);
    const searchParams = new URLSearchParams(location.search);

    const matchedPaths = [];
    paths.reduce((currentPath, path) => {
        const fullPath = `${currentPath}/${path}`;
        const matchedPath = Object.keys(pathNames).find((key) =>
            fullPath.startsWith(key)
        );

        if (matchedPath && !matchedPaths.includes(matchedPath)) {
            matchedPaths.push(matchedPath);
        }

        return fullPath;
    }, '');

    const processedPaths = matchedPaths.reduce((acc, path) => {
        const { label, background } = pathNames[path];

        if (Array.isArray(label)) {
            label.forEach((item) => {
                acc.push({
                    path: item.path,
                    label: item.label,
                    background: pathNames[item.path]?.background,
                });
            });
        } else {
            acc.push({
                path,
                label,
                background,
            });
        }

        return acc;
    }, []);

    // Xử lý query string cho "/get-all-product"
    if (location.pathname.startsWith('/get-all-product')) {
        const category = searchParams.get('category_level_1');
        if (category) {
            processedPaths.push({
                path: location.pathname,
                label: `Sản phẩm cho ${category}`,
            });
        }
    }

    if (processedPaths.length === 0) {
        return null;
    }

    const currentBackground = processedPaths[processedPaths.length - 1]?.background || '';

    return (
        <div className={clsx(styles.main)} style={{ background: currentBackground }}>
            <div className={`grid wide`}>
                <nav className={styles.breadcrumb}>
                    <ol>
                        <li>
                            <Link to="/">Trang chủ</Link>
                        </li>
                        {processedPaths.map((breadcrumb, index) => {
                            const isLast = index === processedPaths.length - 1;

                            return isLast ? (
                                <li key={breadcrumb.path} className={styles.active}>
                                    {breadcrumb.label}
                                </li>
                            ) : (
                                <li key={breadcrumb.path}>
                                    <Link to={breadcrumb.path}>
                                        {breadcrumb.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </div>
    );
};

export default BreadcrumbComponent;
