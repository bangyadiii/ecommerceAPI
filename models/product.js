"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Transaction, User }) {
            // define association here
            this.hasMany(Transaction, { foreignKey: "productId" });
            this.belongsToMany(User, { through: "ProductCart" });
        }
        toJSON() {
            return { ...this.get() };
        }
    }
    Product.init(
        {
            nama_produk: DataTypes.STRING,
            deskripsi_singkat: DataTypes.STRING,
            deskripsi_lengkap: DataTypes.STRING,
            stok: DataTypes.INTEGER,
            image: DataTypes.STRING,
            harga: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
