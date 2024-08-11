import { createBrowserRouter, redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MainLayout from "../components/MainLayout";
import TicketPage from "../pages/Ticket/TicketPage";
import TicketCategory from "../pages/Category/TicketCategory";
import UserList from "../pages/User-List/UserList";
import OrderList from "../pages/Order-List/OrderList";
import RegisterAdmin from "../pages/Register-Admin/RegisterAdmin";
import AdminProfile from "../pages/Admin/ChangePassword";
import PromoCode from "../pages/Promo-Code/PromoCode";
import CheckIn from "../pages/Check-In/CheckIn";
import LoginPage from "../pages/Login/Login";
const checkAuth = () => {
    const isAuthenticated = !!localStorage.getItem("access_token");
    if (!isAuthenticated) {
        return redirect("/");
    }
    return null;
};

const router = createBrowserRouter([
    {
        element : <MainLayout/>,
        children : [
            {
                path : '/tickets',
                element : <TicketPage/>,
                loader : checkAuth
            },
            {
                path : '/ticket-category',
                element : <TicketCategory/>,
                loader : checkAuth
                
            },
            {
                path : '/user-list',
                element : <UserList/>,
                loader : checkAuth
            },
            {
                path : '/order',
                element : <OrderList/>,
                loader : checkAuth
            },
            {
                path : '/register-admin',
                element : <RegisterAdmin/>,
                loader : checkAuth
            },
            {
                path : '/admin-profile',
                element : <AdminProfile/>,
                loader : checkAuth
            },
            {
                path : '/promo-code',
                element : <PromoCode/>,
                loader : checkAuth
            },
            {
                path : '/checkin',
                element : <CheckIn/>,
                loader : checkAuth
            },
        ]
    },
    {
        path: "/",
        element: <LoginPage />,
        loader: () => {
            if (localStorage.getItem("access_token")) {
                // Redirect to home if already logged in
                return redirect("/tickets");
            }
            return null;
        },
    },
])


export default router