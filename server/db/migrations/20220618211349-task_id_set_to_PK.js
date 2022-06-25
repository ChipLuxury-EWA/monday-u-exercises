"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Tasks", "id", {type: Sequelize.INTEGER, primaryKey: true });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Tasks", "id", {type: Sequelize.INTEGER, primaryKey: false });
    },
};
