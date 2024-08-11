const {
    Admin,
    sequelize,
    Category,
    Profile,
    Ticket,
    TicketPrice,
    User,
    UserTicket,
    Order,
    OrderDetail,
    Invoice,
    PromoCode,
} = require("../models/index");
const { hashPassword, compareHash } = require("../helpers/bycript");
const { createToken } = require("../helpers/jwt");

class AdminController {
    // Register Admin
    static async registerAdmin(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { username, email, password } = req.body;

            // Cek apakah admin dengan email atau username sudah ada
            const existingAdminEmail = await Admin.findOne({
                where: { email },
            });
            const existingAdminUsername = await Admin.findOne({
                where: { username },
            });

            if (existingAdminEmail) {
                throw { name: "Email already in use" };
            }

            if (existingAdminUsername) {
                throw { name: "Username already in use" };
            }

            // Hash password
            const hashedPassword = hashPassword(password);

            // Buat admin baru
            const newAdmin = await Admin.create(
                { username, email, password: hashedPassword },
                { transaction: t }
            );

            await t.commit();

            res.status(201).json({
                message: "Admin successfully registered",
                admin: newAdmin,
            });
        } catch (error) {
            await t.rollback();
            console.log(error);
            res.status(400).json({ error: error.name });
        }
    }

    // Login Admin
    static async loginAdmin(req, res, next) {
        try {
            const { email, password } = req.body;
            const admin = await Admin.findOne({ where: { email } });

            if (!admin) {
                throw { name: "Admin not found" };
            }

            // Bandingkan password
            const isMatch = compareHash(password, admin.password);

            if (!isMatch) {
                throw { name: "Invalid credentials" };
            }

            // Generate token
            const payload = { id: admin.id, email: admin.email };
            const accessToken = createToken(payload);

            res.status(200).json({ accessToken, AdminId: admin.id });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.name });
        }
    }

    // Change Password
    static async changePassword(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { oldPassword, newPassword } = req.body;
            const { id } = req.user; // Pastikan middleware otentikasi sudah mengatur req.user

            // Temukan admin
            const admin = await Admin.findByPk(id);
            if (!admin) {
                throw { name: "Admin not found" };
            }

            // Cek old password
            const isMatch = compareHash(oldPassword, admin.password);
            if (!isMatch) {
                throw { name: "Incorrect old password" };
            }

            // Hash new password
            const hashedNewPassword = hashPassword(newPassword);

            // Update password
            await Admin.update(
                { password: hashedNewPassword },
                { where: { id }, transaction: t }
            );

            await t.commit();

            res.status(200).json({ message: "Password changed successfully" });
        } catch (error) {
            await t.rollback();
            console.log(error);
            res.status(400).json({ error: error.name });
        }
    }

    // get all user regis
    static async getUsers(req, res, next) {
        try {
            let data = await User.findAll();

            res.status(200).json(data);
            console.log(
                "test controller in static getUser",
                "<<<<<<<<<<<<<<<<<"
            );
        } catch (error) {
            console.log(error);
        }
    }

    // get all user buy ticket
    static async getAllOrderDetails(req, res, next) {
        try {
            // Mengambil semua OrderDetail beserta asosiasi Order dan TicketPrice
            const orderDetails = await OrderDetail.findAll({
                include: [
                    {
                        model: Order,
                        // as: "order",
                        // attributes: ["id", "otherAttributes"], // Ganti 'otherAttributes' dengan atribut yang sesuai
                    },
                    {
                        model: TicketPrice,
                        // as: "ticketPrice",
                        // attributes: ["id", "price", "description"], // Ganti dengan atribut yang sesuai
                    },
                ],
                where: { isDeleted: false }, // Misalnya hanya mengambil yang tidak dihapus
            });

            res.status(200).json(orderDetails);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Create a new category
    static async createCategory(req, res, next) {
        try {
            const { name } = req.body;

            // Validasi input
            if (!name) {
                return res.status(400).json({ message: "Name is required" });
            }

            // Create category
            const newCategory = await Category.create({ name });

            res.status(201).json({
                message: "Category created successfully",
                category: newCategory,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Get all categories
    static async getAllCategories(req, res, next) {
        try {
            // Get all categories
            const categories = await Category.findAll({
                where: { isDeleted: false },
                include: [
                    {
                        model: TicketPrice,
                        // as: "ticketPrices", // pastikan nama alias sesuai dengan asosiasi
                        // attributes: ["id", "price", "description"], // sesuaikan dengan atribut yang ada di model TicketPrice
                    },
                ],
            });

            res.status(200).json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Get category by id
    static async getCategoryById(req, res, next) {
        try {
            const { id } = req.params;

            // Find category by id
            const category = await Category.findOne({
                where: { id, isDeleted: false },
                include: [
                    {
                        model: TicketPrice,
                        // as: "ticketPrices",
                        // attributes: ["id", "price", "description"],
                    },
                ],
            });

            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }

            res.status(200).json(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Update category by id
    static async updateCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            // Validate input
            if (!name) {
                return res.status(400).json({ message: "Name is required" });
            }

            // Find and update category
            const [updated] = await Category.update(
                { name },
                {
                    where: { id },
                    returning: true,
                }
            );

            if (!updated) {
                return res.status(404).json({ message: "Category not found" });
            }

            const updatedCategory = await Category.findByPk(id);
            res.status(200).json({
                message: "Category updated successfully",
                category: updatedCategory,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Delete category by id
    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;

            // Find category by id
            const category = await Category.findOne({
                where: { id, isDeleted: false },
            });

            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }

            // Soft delete category
            await Category.update({ isDeleted: true }, { where: { id } });

            res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Create Ticket and TicketPrice
    static async createTicket(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { ticketData, ticketPrices } = req.body;

            if (!ticketData || !ticketPrices || !Array.isArray(ticketPrices)) {
                return res.status(400).json({ message: "Invalid data format" });
            }

            // Create Ticket
            const newTicket = await Ticket.create(ticketData, {
                transaction: t,
            });

            // Prepare ticket prices with TicketId
            const ticketPricesWithTicketId = ticketPrices.map((price) => ({
                ...price,
                TicketId: newTicket.id,
            }));

            // Create TicketPrices
            await TicketPrice.bulkCreate(ticketPricesWithTicketId, {
                transaction: t,
            });

            await t.commit();
            res.status(201).json({
                message: "Ticket and TicketPrices created successfully",
                ticket: newTicket,
            });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Update Ticket by ID
    static async updateTicket(req, res, next) {
        try {
            const { id } = req.params;
            const { name, quantity, isDeleted } = req.body;

            // Update Ticket
            const [updated] = await Ticket.update(
                { name, quantity, isDeleted },
                { where: { id }, returning: true }
            );

            if (!updated) {
                return res.status(404).json({ message: "Ticket not found" });
            }

            const updatedTicket = await Ticket.findByPk(id);
            res.status(200).json({
                message: "Ticket updated successfully",
                ticket: updatedTicket,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Delete Ticket by ID
    static async deleteTicket(req, res, next) {
        try {
            const { id } = req.params;

            // Soft delete Ticket
            const [deleted] = await Ticket.update(
                { isDeleted: true },
                { where: { id } }
            );

            if (!deleted) {
                return res.status(404).json({ message: "Ticket not found" });
            }

            res.status(200).json({ message: "Ticket deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Update TicketPrice by ID
    static async updateTicketPrice(req, res, next) {
        try {
            const { id } = req.params;
            const { price, totalTicket, isDeleted, color } = req.body;

            // Update TicketPrice
            const [updated] = await TicketPrice.update(
                { price, totalTicket, isDeleted, color },
                { where: { id }, returning: true }
            );

            if (!updated) {
                return res
                    .status(404)
                    .json({ message: "TicketPrice not found" });
            }

            const updatedTicketPrice = await TicketPrice.findByPk(id);
            res.status(200).json({
                message: "TicketPrice updated successfully",
                ticketPrice: updatedTicketPrice,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Delete TicketPrice by ID
    static async deleteTicketPrice(req, res, next) {
        try {
            const { id } = req.params;

            // Soft delete TicketPrice
            const [deleted] = await TicketPrice.update(
                { isDeleted: true },
                { where: { id } }
            );

            if (!deleted) {
                return res
                    .status(404)
                    .json({ message: "TicketPrice not found" });
            }

            res.status(200).json({
                message: "TicketPrice deleted successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Get All Tickets
    static async getAllTickets(req, res, next) {
        try {
            // Get all tickets with associated ticket prices
            const tickets = await Ticket.findAll({
                where: { isDeleted: false },
                include: [
                    {
                        model: TicketPrice,
                        // as: "ticketPrices",
                        attributes: ["id", "price", "totalTicket", "color"],
                    },
                ],
            });

            res.status(200).json(tickets);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Get Ticket by ID
    static async getTicketById(req, res, next) {
        try {
            const { id } = req.params;

            // Get ticket with associated ticket prices
            const ticket = await Ticket.findOne({
                where: { id, isDeleted: false },
                include: [
                    {
                        model: TicketPrice,
                        // as: "ticketPrices",
                        attributes: ["id", "price", "totalTicket","CategoryId", "color"],
                    },
                ],
            });

            if (!ticket) {
                return res.status(404).json({ message: "Ticket not found" });
            }

            res.status(200).json(ticket);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Create a new promo code
static async createPromoCode(req, res, next) {
    try {
        const { name } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        // Create promo code
        const newPromoCode = await PromoCode.create({ name });

        res.status(201).json({
            message: "Promo code created successfully",
            promoCode: newPromoCode,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
}

// Get all promo codes
static async getAllPromoCodes(req, res, next) {
    try {
        const promoCodes = await PromoCode.findAll({
            where: { isDeleted: false },
        });

        res.status(200).json(promoCodes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
}

// Get promo code by ID
static async getPromoCodeById(req, res, next) {
    try {
        const { id } = req.params;

        const promoCode = await PromoCode.findByPk(id);

        if (!promoCode) {
            return res.status(404).json({ message: "Promo code not found" });
        }

        res.status(200).json(promoCode);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
}

// Update promo code by ID
static async updatePromoCode(req, res, next) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        // Update promo code
        const [updated] = await PromoCode.update(
            { name },
            { where: { id }, returning: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Promo code not found" });
        }

        const updatedPromoCode = await PromoCode.findByPk(id);
        res.status(200).json({
            message: "Promo code updated successfully",
            promoCode: updatedPromoCode,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
}

// Delete promo code by ID
static async deletePromoCode(req, res, next) {
    try {
        const { id } = req.params;

        // Soft delete promo code
        const [deleted] = await PromoCode.update(
            { isDeleted: true },
            { where: { id } }
        );

        if (!deleted) {
            return res.status(404).json({ message: "Promo code not found" });
        }

        res.status(200).json({ message: "Promo code deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
}


static async validatePromoCode(req, res, next) {
    try {
        const { code } = req.body; // The promo code is assumed to be a string

        if (!code) {
            return res.status(400).json({ message: "Promo code is required" });
        }

        // Find the promo code by name
        const promoCode = await PromoCode.findOne({
            where: {
                name: code,
                isDeleted: false // Ensure that isDeleted is handled in the model
            }
        });

        console.log(promoCode, "<<<<<<<<<<<<<<<<");

        if (promoCode) {
            res.status(200).json({ valid: true });
        } else {
            res.status(200).json({ valid: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
}

static async getOrderDetailsByTicketNameAndFullName(req, res, next) {
    try {
        //outputscan =>> Ticket-ibrahim-ticketfebvip
        const {outputscan} = req.body
        let arrOutputScan = outputscan.split("-")
        let fullName = arrOutputScan[1]
        let ticketName = arrOutputScan[2]
        // const { ticketName, fullName } = req.query; // Assuming parameters are passed via query string

        if (!ticketName || !fullName) {
            return res.status(400).json({ message: "Both ticket name and full name are required" });
        }

        // Fetch order details
        const orderDetails = await OrderDetail.findAll({
            include: [
                {
                    model: TicketPrice,
                    // as: 'ticketPrice',
                    include: [
                        {
                            model: Ticket,
                            // as: 'ticket',
                            // attributes: ['name'], // Fetch only the ticket name
                            where: { name: ticketName } // Filter by ticket name
                        }
                    ],
                    attributes: [] // Don't fetch TicketPrice fields, only the associated Ticket fields
                }
            ],
            where: {
                fullName: fullName, // Filter by full name
                isDeleted: false // Ensure you only fetch non-deleted records
            }
        });

        res.status(200).json(orderDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
}
}

module.exports = AdminController;