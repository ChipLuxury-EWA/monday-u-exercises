"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Tasks",
            [
                { taskName: "buy a new gaming laptop", createdAt: new Date(), updatedAt: new Date() },
                { taskName: "take the dog for a walk", createdAt: new Date(), updatedAt: new Date() },
                { taskName: "write the best rap ever", createdAt: new Date(), updatedAt: new Date() },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Tasks", null, {});
    },
};
