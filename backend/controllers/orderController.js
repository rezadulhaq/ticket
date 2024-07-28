const { where } = require("sequelize");
const { hashPassword, compareHash } = require("../helpers/bycript");
const { decodedToken, createToken } = require("../helpers/jwt");

const {
    Buyer,
    Profile,
    Ticket,
    TicketPrice,
    User,
    UserTicket,
    sequelize,
    Order,
    OrderDetail,
} = require("../models/index");

class Controller {

    static async paymentGateWay(req, res, next){
        try {
            const { amount, email } = req.body; // Ambil informasi dari permintaan
    
            const invoiceData = {
                external_id: `invoice_${Date.now()}`,
                amount,
                payer_email: email,
                description: 'Payment for ticket purchase',
            };
    
            const createdInvoice = await invoice.createInvoice(invoiceData);
    
            res.json({ invoiceUrl: createdInvoice.invoice_url });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create payment' });
        }
    }

    static async createOrder(req, res, next) {
        const t = await sequelize.transaction();
        const { userId, orderDetails } = req.body;
        try {
            console.log({ userId, orderDetails });
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: "User tidak ditemukan" });
            }

            const order = await Order.create(
                { UserId: userId },
                { transaction: t }
            );

            const createdOrderDetails = [];
            for (const detail of orderDetails) {
                let {
                    TicketPriceId,
                    lineId,
                    fullName,
                    email,
                    phoneNumber,
                    highSchool,
                } = detail;

                TicketPriceId = +TicketPriceId;
                const ticket = await TicketPrice.findByPk(TicketPriceId);
                if (!ticket) {
                    return res.status(404).json({
                        error: `Tiket dengan id ${TicketPriceId} tidak ditemukan`,
                    });
                }

                const orderDetail = await OrderDetail.create(
                    {
                        lineId,
                        fullName,
                        email,
                        phoneNumber,
                        highSchool,
                        OrderId: order.id,
                        TicketPriceId: ticket.id,
                    },
                    { transaction: t }
                );

                createdOrderDetails.push(orderDetail);
            }

            await t.commit();
            res.status(201).json({
                message: "Order Berhasil",
                order,
                orderDetails: createdOrderDetails,
            });
        } catch (error) {
            res.status(500).json({ error: "error" });
        }
    }
}

module.exports = Controller;
