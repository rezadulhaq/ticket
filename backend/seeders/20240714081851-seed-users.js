"use strict";

const { hashPassword } = require("../helpers/bycript");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const data = require("../data/users.json").map(function (el) {
            el.createdAt = new Date();
            el.updatedAt = new Date();
            el.password = hashPassword(el.password);
            return el;
        });
        await queryInterface.bulkInsert("Users", data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Users", null, {});
    },
};
