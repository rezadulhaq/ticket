const jwt = require("jsonwebtoken");

const createToken = function (payload) {
    // console.log(process.env.SECRET_JWT);
    return jwt.sign(payload, process.env.SECRET_JWT);
};

const decodedToken = function (token) {
    return jwt.verify(token, process.env.SECRET_JWT);
};
// helpers

module.exports = { createToken, decodedToken };
