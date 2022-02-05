const { validationResult } = require("express-validator");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

//sign up
exports.signUp = async (req, res, next) => {
    // validation data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error();
        err.message = "Invalid input tidak sesuai.";
        err.status = 400;
        err.data = errors.array();
        throw err;
    }

    const { username, email, password, alamat, noHP } = req.body;

    try {
        const newUser = new User({ username, email, password, alamat, noHP });
        newUser.password = bcrypt.hashSync(newUser.password, 10);

        await newUser.save();

        console.log(newUser.dataValues);
        res.status(201).json({
            message: "Account has been created successfully",
            data: newUser,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

//sign in
exports.signIn = (req, res, next) => {
    //mendapatkan nim dari request query

    res.status(200).json({
        message: "Sign In has been Success..",
        data,
    });
};

exports.getNama = async (req, res, next) => {
    try {
        const id = req.query.id;

        const data = await User.findAll({
            where: { id: id },
        });

        if (data.length > 0) {
            res.status(200).json({
                message: `Data ditemukan`,
                data,
            });
        } else {
            res.status(404).json({
                message: `Data tidak ditemukan!!`,
                data: data || null,
            });
        }
    } catch (err) {
        err.status = 400;
        next(err);
    }
};
