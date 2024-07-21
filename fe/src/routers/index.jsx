import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/Login";
import Register from "../pages/Register";
import Tickets from "../pages/Ticket";
import TicketPage from "../pages/TikcetPayment";
import Qr from "../pages/Qr";
import Invoice from "../pages/Invoice";


const router = createBrowserRouter([
    {
        element : <LandingPage/>,
        path : '/'
    },
    {
        element : <LoginPage/>,
        path : '/login'
    },
    {
        element : <Register/>,
        path : '/register'
    },
    {
        element : <Tickets/>,
        path : '/buyticket'
    },
    {
        element : <TicketPage/>,
        path : '/ticket-page'
    },
    {
        element : <Qr/>,
        path : '/payment'
    },
    {
        element : <Invoice/>,
        path : '/invoice'
    }
])

export default router