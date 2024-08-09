"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Ticket.belongsTo(models.User, {
            //     foreignKey: "authorId",
            //     as: "author",
            // });
            Ticket.hasMany(models.TicketPrice, {
                foreignKey: "TicketId",
                // as: "ticket",
            });
        }
    }
    Ticket.init(
        {
            name: DataTypes.STRING,
            quantity: DataTypes.INTEGER,
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            hooks: {
                beforeCreate(instance, option) {
                    instance.isDeleted = false;
                },
            },
            sequelize,
            modelName: "Ticket",
        }
    );
    return Ticket;
};
