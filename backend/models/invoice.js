"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Invoice extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Invoice.init(
        {
            name: DataTypes.STRING,
            orderNumber: DataTypes.STRING,
            orderDate: DataTypes.DATE,
            ticketType: DataTypes.STRING,
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
        },
        {
            sequelize,
            modelName: "Invoice",
        }
    );
    return Invoice;
};
