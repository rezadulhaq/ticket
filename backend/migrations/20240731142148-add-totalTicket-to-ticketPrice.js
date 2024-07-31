"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn("TicketPrices", "totalTicket", {
            type: Sequelize.INTEGER,
            allowNull: true, // Atur sesuai kebutuhan, misalnya 'false' jika kolom ini wajib diisi
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn("TicketPrices", "totalTicket");
    },
};
