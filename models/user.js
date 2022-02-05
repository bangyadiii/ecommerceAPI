"use strict";
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
            instanceMethods: {
                generateHash: function (password) {
                    return bcrypt.hashSync(
                        password,
                        bcrypt.genSaltSync(10),
                        null
                    );
                },
                validPassword: function (password) {
                    return bcrypt.compareSync(password, this.password);
                },
            },
        }
    );
    return User;
};
