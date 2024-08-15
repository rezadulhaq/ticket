"use strict";
const bcryptjs = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
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
            phoneNumber: DataTypes.STRING,
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
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            hooks: {
                beforeCreate(instance, option) {
                    let salt = bcryptjs.genSaltSync(10);
                    let hash = bcryptjs.hashSync(instance.password, salt);

                    instance.password = hash;
                },
            },
            sequelize,
            modelName: "User",
            defaultScope: {
                attributes: { exclude: ['password'] } // Exclude password by default
            },
            scopes: {
                withPassword: {
                    attributes: {} // Include all attributes, including password
                }
            }
        }
    );
    return User;
};
