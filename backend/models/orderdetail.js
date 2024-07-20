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
                references: {
                    model: "Orders",
                    key: "id",
                },
                onUpdate: "cascade",
                onDelete: "cascade",
            },
            TicketId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Tickets",
                    key: "id",
                },
                onUpdate: "cascade",
                onDelete: "cascade",
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
