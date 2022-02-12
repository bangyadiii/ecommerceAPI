"use strict";
module.exports = {
    async up(queryInterface, Datatypes) {
        await queryInterface.createTable("Transactions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Datatypes.INTEGER,
            },
            userId: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
            productId: {
                type: Datatypes.INTEGER,
            },
            product_qty: {
                type: Datatypes.INTEGER,
            },

            createdAt: {
                allowNull: false,
                type: Datatypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Datatypes.DATE,
            },
        });
    },
    async down(queryInterface, Datatypes) {
        await queryInterface.dropTable("Transactions");
    },
};
