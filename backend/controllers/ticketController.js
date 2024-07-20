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
} = require("../models/index");

class Controller {
    static async getAllTicket(req, res, next) {
        try {
            const data = await Ticket.findAll();

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
}

module.exports = Controller;
