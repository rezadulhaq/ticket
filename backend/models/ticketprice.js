"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TicketPrice extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            TicketPrice.belongsTo(models.Ticket, {
                foreignKey: "TicketId",
                // as: "ticket",
            });
            TicketPrice.belongsTo(models.Category, {
                foreignKey: "CategoryId",
                // as: "ticket",
            });
        }
    }
    TicketPrice.init(
        {
            CategoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "CategoryId is Required",
                    },
                    notEmpty: {
                        msg: "CategoryId is Required",
                    },
                },
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "price is Required",
                    },
                    notEmpty: {
                        msg: "price is Required",
                    },
                },
            },
            TicketId: {
                type: DataTypes.INTEGER,

                allowNull: false,
                validate: {
                    notNull: {
                        msg: "TicketId is Required",
                    },
                    notEmpty: {
                        msg: "TicketId is Required",
                    },
                },
            },
            totalTicket: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "totalTicket is Required",
                    },
                    notEmpty: {
                        msg: "totalTicket is Required",
                    },
                },
            },
            isDeleted: DataTypes.BOOLEAN,
            color: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "TicketPrice",
        }
    );
    return TicketPrice;
};
