'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TicketPrices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
            model: "Categories",
            key: "id",
        },
      },
      price: {
        type: Sequelize.INTEGER
      },
      TicketId: {
        type: Sequelize.INTEGER,
        references: {
            model: "Tickets",
            key: "id",
        },
      },
      isDeleted: {
        type: Sequelize.BOOLEAN
      },
      color: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TicketPrices');
  }
};