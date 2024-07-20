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
        }
    }
    TicketPrice.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
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
            modelName: "TicketPrice",
        }
    );
    return TicketPrice;
};
