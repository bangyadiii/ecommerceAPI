"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Product }) {
            this.belongsTo(User, { onDelete: "CASCADE" });
            this.belongsTo(Product, { onDelete: "RESTRICT" });
        }
        toJSON() {
            return { ...this.get() };
        }
    }
    Transaction.init(
        {
            userId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
            product_qty: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Transaction",
        }
    );
    return Transaction;
};
