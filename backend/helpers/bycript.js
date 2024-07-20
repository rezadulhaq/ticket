const bcrypt = require("bcryptjs");

const hashPassword = function (password) {
    return bcrypt.hashSync(password);
};

const compareHash = function (password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
};
// helpers

module.exports = { hashPassword, compareHash };
