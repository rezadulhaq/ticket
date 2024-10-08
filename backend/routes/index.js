const express = require("express");
const UserController = require("../controllers/userController");
const TicketController = require("../controllers/ticketController");
const OrderController = require("../controllers/orderController");
const { authentication } = require("../middlewares/auth");
const router = express.Router();
const adminRoutes = require("./adminroute");
router.get("/user", UserController.getUsers);
router.post("/user", UserController.createUsers);
router.post("/user/login", UserController.loginUser);
router.get("/user/:id", UserController.getUserById);
router.put("/user/:id", UserController.updateUsersById);
router.delete("/user/:id", UserController.deleteUsersById);

// router.use(authentication);

router.get("/ticket", TicketController.getAllTicket);
router.get("/ticket/:id", TicketController.getTicketById);
router.get("/ticket-promo/:name", OrderController.checkPromoCode);
router.get("/category", TicketController.getAllCategoryTicket);
router.post("/order", OrderController.createOrder);

router.get('/order', OrderController.getAllOrders);
router.get('/order/user/:userId', OrderController.getOrdersByUserId);
router.get('/order/:orderId', OrderController.getOrderById);

router.post("/api/create-payment", OrderController.paymentGateWay);
router.get("/api/generateQR", OrderController.generateQRCode);
router.get("/api/check-payment-status", OrderController.checkPaymentStatus);
router.post("/create-qr-code", TicketController.createQRCode);

// Admin Routes
router.use("/admin", adminRoutes);

module.exports = router;
