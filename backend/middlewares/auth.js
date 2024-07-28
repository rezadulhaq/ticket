// const {
//     Buyer,
//     Profile,
//     Ticket,
//     TicketPrice,
//     User,
//     UserTicket,
// } = require("../models/index");

// const { decodedToken } = require("../helpers/jwt");

// async function authentication(req, res, next) {
//     try {
//         const access_token = req.headers.access_token;
//         if (!access_token) {
//             throw {
//                 name: "error woy",
//             };
//         }

//         const payload = decodedToken(access_token);

//         const user = await User.findOne({ where: { id: payload.id } });
//         if (!user) {
//             throw {
//                 name: "error woy dikit",
//             };
//         }

//         req.user = {
//             access_token,
//             userName: user.userName,
//         };

//         next();
//     } catch (error) {
//         res.status(400).json(error);
//     }
// }

// module.exports = { authentication };


const { User } = require("../models/index");
const { decodedToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
    try {
        // Check for access token in headers
        const access_token = req.headers.access_token;
        if (!access_token) {
            return res.status(401).json({ message: "Access token is missing" });
        }

        // Decode and verify the token
        const payload = decodedToken(access_token);
        if (!payload || !payload.id) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        // Fetch user from the database
        const user = await User.findOne({ where: { id: payload.id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user information to the request object
        req.user = {
            access_token,
            userName: user.userName,
        };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { authentication };
