"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Define associations here
            OrderDetail.belongsTo(models.Order, {
                foreignKey: 'OrderId',
                // as: 'order',
            });
            OrderDetail.belongsTo(models.TicketPrice, {
                foreignKey: 'TicketPriceId',
                // as: 'ticketPrice',
            });
        }
    }
    OrderDetail.init(
        {
            lineId: DataTypes.STRING,
            fullName: DataTypes.STRING,
            email: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            highSchool: DataTypes.STRING,
            OrderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "OrderId is Required",
                    },
                    notEmpty: {
                        msg: "OrderId is Required",
                    },
                },
            },
            TicketPriceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "TicketPriceId is Required",
                    },
                    notEmpty: {
                        msg: "TicketPriceId is Required",
                    },
                },
            },
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "OrderDetail",
        }
    );
    return OrderDetail;
};
