"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Invoices", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            orderNumber: {
                type: Sequelize.STRING,
            },
            orderDate: {
                type: Sequelize.DATE,
            },
            ticketType: {
                type: Sequelize.STRING,
            },
            OrderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Orders",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Invoices");
    },
};
