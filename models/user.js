"use strict";
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Transaction, Product }) {
            // define association here
            this.hasMany(Transaction, {
                foreignKey: "userId",
                as: "Transaction",
            });
            this.belongsToMany(Product, { through: "ProductCart", as: "Cart" });
        }
        toJSON() {
            return { ...this.get() };
        }

        async validPassword(password) {
            return await bcrypt.compare(password, this.password);
        }
    }
    User.init(
        {
            username: DataTypes.STRING,
            nama: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            alamat: DataTypes.STRING,
            noHP: DataTypes.STRING,
            refresh_token: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(12);
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(12);
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                },
            },
        }
    );
    return User;
};
