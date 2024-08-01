const { where } = require("sequelize");
const { hashPassword, compareHash } = require("../helpers/bycript");
const { decodedToken, createToken } = require("../helpers/jwt");
const axios = require("axios");

const {
    Buyer,
    Profile,
    Ticket,
    TicketPrice,
    Category,
    User,
    UserTicket,
    sequelize,
} = require("../models/index");
const { v4: uuidv4 } = require("uuid");

// move this function if it will be used by multiple controller
function getConfig(method, data) {
    return {
        method: method,
        url: "https://api.xendit.co/qr_codes",
        headers: {
            "api-version": "2022-07-31",
            "Content-Type": "application/json",
        },
        auth: {
            username: process.env.XENDIT_SECRET_KEY,
            password: "",
        },
        data: data,
    };
}

class Controller {
    static async getAllCategoryTicket(req, res, next) {
        try {
            const data = await Category.findAll({
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
            });

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async getAllTicket(req, res, next) {
        try {
            const data = await Ticket.findAll({
                include: [
                    {
                        model: TicketPrice,
                        include: [
                            {
                                model: Category,
                            },
                        ],
                    },
                ],
            });

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async getTicketById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Ticket.findOne({ where: { id } });
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async createTicket(req, res, next) {
        try {
            const { name, quantity } = req.body;
            const data = await Ticket.create({ name, quantity });
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async updateTicketById(req, res, next) {
        try {
            const { name, quantity } = req.body;
            const { id } = req.params;
            const data = await Ticket.update(
                { name, quantity },
                { where: { id } }
            );
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    // move this to other controller soon
    static async createQRCode(req, res) {
        try {
            const { userId, totalPrice, orderDetails } = req.body;
            // console.log({ orderDetails });
            let random = Math.floor(Math.random() * 1000);
            const data = {
                reference_id: uuidv4(),
                type: "DYNAMIC",
                currency: "IDR",
                amount: totalPrice,
            };
            let response = await axios(getConfig("POST", data));
            response.data.dataTicket = orderDetails;
            res.status(200).json(response.data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller;
