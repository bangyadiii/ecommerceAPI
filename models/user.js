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
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.BOOLEAN,
            password: DataTypes.STRING,
            alamat: DataTypes.STRING,
            noHP: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, "a");
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, "a");
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                },
            },
            instanceMethods: {
                validPassword: function (password) {
                    return bcrypt.compareSync(password, this.password);
                },
            },
        }
    );
    return User;
};
