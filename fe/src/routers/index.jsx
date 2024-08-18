import { createBrowserRouter, redirect } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/Login";
import Register from "../pages/Register";
import Tickets from "../pages/Ticket";
import TicketPage from "../pages/TikcetPayment";
import Qr from "../pages/Qr";
import Invoice from "../pages/Invoice";
import MyOrders from "../pages/MyOrder";

const checkAuth = () => {
    const isAuthenticated = !!localStorage.getItem("access_token");
    if (!isAuthenticated) {
        return redirect("/login");
    }
    return null;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        loader: checkAuth,  // Add this loader if you want to restrict access
    },
    {
        path: "/buyticket",
        element: <Tickets />,
        loader: checkAuth,  // Add this loader to restrict access
    },
    {
        path: "/ticket-page",
        element: <TicketPage />,
        loader: checkAuth,  // Add this loader to restrict access
    },
    {
        path: "/my-orders",
        element: <MyOrders />,
        loader: checkAuth,  // Add this loader to restrict access
    },
    {
        path: "/payment",
        element: <Qr />,
        loader: checkAuth,  // Add this loader to restrict access
    },
    {
        path: "/invoice",
        element: <Invoice />,
        loader: checkAuth,  // Add this loader to restrict access
    },
    {
        path: "/login",
        element: <LoginPage />,
        loader: () => {
            if (localStorage.getItem("access_token")) {
                // Redirect to home if already logged in
                return redirect("/");
            }
            return null;
        },
    },
    {
        path: "/register",
        element: <Register />,
        loader: () => {
            if (localStorage.getItem("access_token")) {
                // Redirect to home if already logged in
                return redirect("/");
            }
            return null;
        },
    },
]);

export default router;
