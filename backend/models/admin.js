"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Admin.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull : false,
                validate: {
                    notNull: {
                        msg: "username is required",
                    },
                    notEmpty: {
                        msg: "username is required",
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "email is required",
                    },
                    notEmpty: {
                        msg: "email is required",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "password is required",
                    },
                    notEmpty: {
                        msg: "password is required",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Admin",
        }
    );
    return Admin;
};
