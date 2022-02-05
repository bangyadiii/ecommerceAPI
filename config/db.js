const sequelize = require("sequelize");

const db = new sequelize("s4l", "root", "toor", {
    dialect: "mysql",
});

db.sync({});

module.exports = db;
