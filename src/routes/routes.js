import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import GeneralTermsPage from "../pages/GeneralTermsPage/GeneralTermsPage"
import SignInPage from "../pages/SignInPage/SignInPage"
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage"
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage"
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage"
import AboutPage from "../pages/AboutPage/AboutPage";
import GuaranteePage from "../pages/GuaranteePage/GuaranteePage";
import ReturnPolicyPage from "../pages/ReturnPolicyPage/ReturnPolicyPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage/PrivacyPolicyPage";
import MyCartPage from "../pages/MyCartPage/MyCartPage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage"; 
import LogoutPage from "../pages/LogoutPage/LogoutPage";
import AccountInfo from "../pages/AccountPage/AccountInfo";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import ChangeEmail from "../pages/ChangeEmail/ChangeEmail";
import ChangePhone from "../pages/ChangePhone/ChangePhone";
import EditAccount from "../pages/AccountPage/EditAccount";
import NewPassword from "../pages/ChangePassword/NewPassword";
import NewEmail from "../pages/ChangeEmail/NewEmail";
import NewPhone from "../pages/ChangePhone/NewPhone";
import ChangeAddress from "../pages/ChangeAddress/ChangeAddress";
import VerificationForm from "../components/VerificationForm/VerificationForm";
import FavoriteProductsPage from "../pages/FavoriteProductsPage/FavoriteProductsPage";
import HelpCarePage from "../pages/HelpCarePage/HelpCarePage";
import NotificationPage from "../pages/NotificationPage/NotificationPage";
import FAQPage from "../pages/FAQPage/FAQPage";
import UserProfile from "../pages/MyOrderPage/UserProfile";
import VoucherPage from "../pages/VoucherPage/VoucherPage";
import OrderDetailsPage from "../pages/OrderDetailsPage/OrderDetailsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ProductFeedBackPage from "../pages/ProductFeedBackPage/ProductFeedBackPage";

export const routes = [ 
    //Routes cho User
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/general-terms',
        page: GeneralTermsPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/order-details',
        page: OrderDetailsPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/product-feedback',
        page: ProductFeedBackPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/reset',
        page: ResetPasswordPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/about',
        page: AboutPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/guarantee',
        page: GuaranteePage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/return-policy',
        page: ReturnPolicyPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/privacy-policy',
        page: PrivacyPolicyPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/my-cart/:id',
        page: MyCartPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/check-out/:id',
        page: CheckOutPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/account/profile',
        page: AccountInfo,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/account/edit-info',
        page: EditAccount,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/account/edit-password',
        page: ChangePassword,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/account/edit-password/new-password',
        page: NewPassword,
        isShowHeader: true
    },
    {
        path: '/account/edit-email',
        page: ChangeEmail,
        isShowHeader: true
    },
    {
        path: '/account/new-email',
        page: NewEmail,
        isShowHeader: true
    },
    {
        path: '/account/edit-phone',
        page: ChangePhone,
        isShowHeader: true
    },
    {
        path: '/account/new-phone',
        page: NewPhone,
        isShowHeader: true
    },
    {
        path: '/account/edit-address',
        page: ChangeAddress,
        isShowHeader: true
    },
    {
        path: '/product-details',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/logout',
        page: LogoutPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/verification',
        page: VerificationForm,
        isShowHeader: true
    },
    {
        path: '/get-all-product',
        page: TypeProductPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/favorite-products/:id',
        page: FavoriteProductsPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/notifications',
        page: NotificationPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/voucher',
        page: VoucherPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/faq',
        page: FAQPage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/user-profile',
        page: ProfilePage,
        isShowHeader: true,
        role: "user"
    },
    {
        path: '/help-center',
        page: HelpCarePage,
        isShowHeader: true,
        role: "user"
    },

    // Routes cho Admin
    // {
    //     path: process.env.REACT_APP_ADMIN_PATH + "/dashboard",
    //     page: AdminDashboardPage,
    //     isShowHeader: false,
    //     role: "admin"
    // },


    // Routes cho trang không có
    {
        path: '*',
        page: NotFoundPage
    }
]