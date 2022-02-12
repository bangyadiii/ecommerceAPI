"use strict";
module.exports = {
    async up(queryInterface, Datatypes) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Datatypes.INTEGER,
            },
            username: {
                type: Datatypes.STRING,
                allowNull: false,
                unique: true,
            },
            nama: {
                type: Datatypes.STRING,
            },
            email: {
                type: Datatypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: Datatypes.STRING,
                allowNull: false,
            },
            alamat: {
                type: Datatypes.STRING,
            },
            noHP: {
                type: Datatypes.STRING,
            },
            refresh_token: {
                type: Datatypes.STRING,
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
        await queryInterface.dropTable("Users");
    },
};
