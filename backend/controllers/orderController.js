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
    Invoice,
    PromoCode,
} = require("../models/index");

const axios = require("axios");

const QRCode = require("qrcode");

class Controller {
    static async checkPaymentStatus(req, res, next) {
        const { qrCodeId } = req.query; // Ambil qrCodeId dari parameter query
        console.log(req.query, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        try {
            // const response = await axios.get(
            //     `https://api.xendit.co/qr_codes/${qrCodeId}`,
            //     {
            //         headers: {
            //             "api-version": "2022-07-31",
            //             Authorization: `Basic ${Buffer.from(
            //                 `${process.env.XENDIT_SECRET_KEY}:`
            //             ).toString("base64")}`,
            //         },
            //     }
            // );

            const response = await axios.get(
                `https://api.xendit.co/qr_codes/${qrCodeId}`,
                {
                    headers: {
                        "api-version": "2022-07-31",
                        Authorization: `Basic ${Buffer.from(
                            `${process.env.XENDIT_SECRET_KEY}:`
                        ).toString("base64")}`,
                    },
                }
            );

            console.log(response, "<<<<<<<<<<<<<");

            const status = response.data.status; // Ambil status dari respons Xendit

            res.status(200).json({ status });
        } catch (error) {
            console.error("Error checking payment status:", error);
            res.status(500).json({ error: error.message });
        }
    }

    static async checkPromoCode(req, res, next) {
        try {
            const name = req.params.name;
            let data = await PromoCode.findOne({ where: { name } });
            let result;
            if (data) {
                res.status(200).json({
                    message: "Promo Berhasil",
                    status: true,
                });
            } else {
                res.status(200).json({
                    message: "Promo Berhasil",
                    status: false,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Failed to check payment status",
            });
        }
    }

    static async generateQRCode(req, res, next) {
        const qrString = "some-random-qr-string";

        try {
            // Generate QR code
            const qrCodeImage = await QRCode.toBuffer(qrString);

            // Set response headers
            res.setHeader("Content-Type", "image/png");
            res.setHeader(
                "Content-Disposition",
                'inline; filename="qrcode.png"'
            );

            // Send QR code image as response
            res.send(qrCodeImage);
        } catch (err) {
            res.status(500).send("Error generating QR code");
        }
    }

    static async paymentGateWay(req, res, next) {
        try {
            const { amount, email } = req.body; // Ambil informasi dari permintaan

            const invoiceData = {
                external_id: `invoice_${Date.now()}`,
                amount,
                payer_email: email,
                description: "Payment for ticket purchase",
            };

            const createdInvoice = await invoice.createInvoice(invoiceData);

            res.json({ invoiceUrl: createdInvoice.invoice_url });
            // console.log(invoiceUrl, "????????????????");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create payment" });
        }
    }

    static async createOrder(req, res, next) {
        const t = await sequelize.transaction();
        const { userId, orderDetails } = req.body;
        try {
            console.log({ userId, orderDetails });

            // Verifikasi keberadaan user
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: "User tidak ditemukan" });
            }

            // Buat order
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
                    parentPhoneNumber,
                    highSchool,
                } = detail;

                TicketPriceId = +TicketPriceId;

                // Temukan TicketPrice
                const ticket = await TicketPrice.findByPk(TicketPriceId);
                if (!ticket) {
                    await t.rollback();
                    return res.status(404).json({
                        error: `Tiket dengan id ${TicketPriceId} tidak ditemukan`,
                    });
                }

                // Periksa apakah ada tiket yang tersedia
                if (ticket.totalTicket <= 0) {
                    await t.rollback();
                    return res.status(400).json({
                        error: `Tiket dengan id ${TicketPriceId} sudah habis`,
                    });
                }

                // Kurangi totalTicket
                await TicketPrice.update(
                    { totalTicket: ticket.totalTicket - 1 },
                    { where: { id: TicketPriceId }, transaction: t }
                );

                // Buat OrderDetail
                const orderDetail = await OrderDetail.create(
                    {
                        lineId,
                        fullName,
                        email,
                        phoneNumber,
                        parentPhoneNumber,
                        highSchool,
                        OrderId: order.id,
                        TicketPriceId: ticket.id,
                    },
                    { transaction: t }
                );

                createdOrderDetails.push(orderDetail);
            }

            // Commit transaksi
            await t.commit();
            res.status(201).json({
                message: "Order Berhasil",
                order,
                orderDetails: createdOrderDetails,
            });
        } catch (error) {
            // Rollback transaksi jika terjadi error
            if (t) await t.rollback();
            res.status(500).json({ error: "error" });
        }
    }

    // Endpoint untuk mendapatkan semua pesanan
    static async getAllOrders(req, res, next) {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: OrderDetail,
                        // as: "orderDetails",
                    },
                ],
            });
            res.status(200).json(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // Endpoint untuk mendapatkan pesanan berdasarkan userId
    static async getOrdersByUserId(req, res, next) {
        const { userId } = req.params;
        console.log(userId, req.params);
        try {
            const orders = await Order.findAll({
                where: { UserId: userId },
                include: [
                    {
                        model: OrderDetail,
                        include: [
                            {
                                model: TicketPrice,
                                include: [
                                    {
                                        model: Ticket,
                                    },
                                ],
                            },
                        ],
                        // as: "orderDetails",
                    },
                ],
            });
            if (orders.length === 0) {
                return res
                    .status(404)
                    .json({ message: "No orders found for this user" });
            }
            res.status(200).json(orders);
        } catch (error) {
            console.error("Error fetching orders for user:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // Endpoint untuk mendapatkan pesanan berdasarkan orderId
    static async getOrderById(req, res, next) {
        const { orderId } = req.params;
        try {
            const order = await Order.findByPk(orderId, {
                include: [
                    {
                        model: OrderDetail,
                        // as: "orderDetails",
                    },
                ],
            });
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        } catch (error) {
            console.error("Error fetching order by ID:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = Controller;
