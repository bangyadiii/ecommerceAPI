"use strict";
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable("Products", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            nama_produk: {
                type: DataTypes.STRING,
            },
            deskripsi_singkat: {
                type: DataTypes.STRING,
            },
            deskripsi_lengkap: {
                type: DataTypes.STRING,
            },
            stok: {
                type: DataTypes.INTEGER,
            },
            image: {
                type: DataTypes.STRING,
            },
            harga: {
                type: DataTypes.INTEGER,
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
    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable("Products");
    },
};
