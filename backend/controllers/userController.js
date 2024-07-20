const { where } = require("sequelize");

const {
    Buyer,
    Profile,
    Ticket,
    TicketPrice,
    User,
    UserTicket,
    sequelize,
} = require("../models/index");
const { hashPassword, compareHash } = require("../helpers/bycript");
const { decodedToken, createToken } = require("../helpers/jwt");
class Controller {
    static async getUsers(req, res, next) {
        try {
            let data = await User.findAll();

            res.status(200).json(data);
            console.log("test controller in static getUser");
        } catch (error) {
            console.log(error);
        }
    }

    // register
    static async createUsers(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const {
                userName,
                email,
                password,
                lineId,
                fullName,
                phoneNumber,
                highSchool,
            } = req.body;

            const getUserEmail = await User.findOne({ where: { email } });

            const getUserUserName = await User.findOne({ where: { userName } });

            if (getUserEmail) {
                throw {
                    name: "akun udah ada woy email",
                };
            }

            if (getUserUserName) {
                throw {
                    name: "akun udah ada woy username",
                };
            }

            const dataUser = await User.create(
                {
                    userName,
                    email,
                    password,
                    phoneNumber,
                },
                { transaction: t }
            );

            // console.log(dataUser, "<<<<<<<<<<<<<<<<<<<");
            await Profile.create(
                {
                    lineId,
                    fullName,
                    phoneNumber,
                    highSchool,
                    UserId: dataUser.id,
                },
                { transaction: t }
            );

            await t.commit();

            // const getProfile = await Profile.findOne({ where: { email } });
            res.status(201).json("User berhasil ditambahkan");
        } catch (error) {
            await t.rollback();
            console.log(error);
        }
    }

    static async updateUsersById(req, res, next) {
        try {
            const { id } = req.params;
            const { userName, email, password } = req.body;
            const data = await User.findOne({ where: { id } });
            if (!data) {
                throw {
                    name: "error not found",
                };
            }
            await User.update(
                { userName, email, password: hashPassword(password) },
                { where: { id } }
            );

            res.status(201).json(
                `User dengan username ${data.userName} berhasil diupdate`
            );
            // res.status(201).json({ userName, email, password });
            console.log("test controller in static createUser");
        } catch (error) {
            res.status(401).json(error);
            console.log(error);
        }
    }

    static async deleteUsersById(req, res, next) {
        try {
            const { id } = req.params;

            const data = await User.findOne({ where: { id } });
            if (!data) {
                throw {
                    name: "error not found",
                };
            }
            await User.destroy({ where: { id } });

            res.status(200).json(
                `data dengan userName ${data.userName} berhasil dihapus`
            );
        } catch (error) {
            res.status(401).json(error);
            console.log(error);
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { userName, password } = req.body;
            const data = await User.findOne({ where: { userName } });

            if (!data) {
                throw {
                    name: "User not found",
                };
            }

            const compare = compareHash(password, data.password);

            if (!compare) {
                throw {
                    name: "invalicredentials",
                };
            }

            const payload = { id: data.id, userName: data.userName };

            const accesstoken = createToken(payload);

            res.status(200).json(accesstoken);
            // await
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller;
