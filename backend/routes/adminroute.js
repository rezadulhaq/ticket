const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// Admin Routes

// Admin Authentication Routes
router.post('/register', AdminController.registerAdmin); // Register Admin
router.post('/login', AdminController.loginAdmin); // Login Admin
router.put('/change-password', AdminController.changePassword); // Change Admin Password

// Category Routes
router.post('/categories', AdminController.createCategory); // Create Category
router.get('/categories', AdminController.getAllCategories); // Get All Categories
router.get('/categories/:id', AdminController.getCategoryById); // Get Category by ID
router.put('/categories/:id', AdminController.updateCategory); // Update Category by ID
router.delete('/categories/:id', AdminController.deleteCategory); // Delete Category by ID

// Ticket Routes
router.post('/tickets', AdminController.createTicket); // Create Ticket and TicketPrices
router.get('/tickets', AdminController.getAllTickets); // Get All Tickets
router.get('/tickets/:id', AdminController.getTicketById); // Get Ticket by ID
router.put('/tickets/:id', AdminController.updateTicket); // Update Ticket by ID
router.delete('/tickets/:id', AdminController.deleteTicket); // Delete Ticket by ID

// TicketPrice Routes
router.put('/ticket-prices/:id', AdminController.updateTicketPrice); // Update TicketPrice by ID
router.delete('/ticket-prices/:id', AdminController.deleteTicketPrice); // Delete TicketPrice by ID

// User and Order Details Routes
router.get('/users', AdminController.getUsers); // Get All Users
router.get('/order-details', AdminController.getAllOrderDetails); // Get All OrderDetails

module.exports = router;
