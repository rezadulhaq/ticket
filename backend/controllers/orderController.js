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
    static async createOrder(req, res, next) {
        const t = await sequelize.transaction();
        const { userId, orderDetails } = req.body;
        try {
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
                const {
                    TicketId,
                    lineId,
                    fullName,
                    email,
                    phoneNumber,
                    highSchool,
                } = detail;

                const ticket = await Ticket.findByPk(TicketId);
                if (!ticket) {
                    return res.status(404).json({
                        error: `Tiket dengan id ${TicketId} tidak ditemukan`,
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
                        TicketId: ticket.id,
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
            // console.error(error);
            res.status(500).json({ error: "error" });
        }
    }
}

module.exports = Controller;
