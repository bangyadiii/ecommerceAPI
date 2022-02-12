"use strict";
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable("Categories", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            category: {
                type: DataTypes.STRING,
            },

            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Categories");
    },
};
