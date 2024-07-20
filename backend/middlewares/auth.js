const {
    Buyer,
    Profile,
    Ticket,
    TicketPrice,
    User,
    UserTicket,
} = require("../models/index");

const { decodedToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
    try {
        const access_token = req.headers.access_token;
        if (!access_token) {
            throw {
                name: "error woy",
            };
        }

        const payload = decodedToken(access_token);

        const user = await User.findOne({ where: { id: payload.id } });
        if (!user) {
            throw {
                name: "error woy dikit",
            };
        }

        req.user = {
            access_token,
            userName: user.userName,
        };

        next();
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { authentication };
