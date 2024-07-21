const express = require("express");
const UserController = require("../controllers/userController");
const TicketController = require("../controllers/ticketController");
const OrderController = require("../controllers/orderController");
const { authentication } = require("../middlewares/auth");
const router = express.Router();

router.get("/user", UserController.getUsers);
router.post("/user", UserController.createUsers);
router.post("/user/login", UserController.loginUser);
router.put("/user/:id", UserController.updateUsersById);
router.delete("/user/:id", UserController.deleteUsersById);

// router.use(authentication);

router.get("/ticket", TicketController.getAllTicket);
router.get("/category", TicketController.getAllCategoryTicket);
router.post("/order", OrderController.createOrder);

module.exports = router;
