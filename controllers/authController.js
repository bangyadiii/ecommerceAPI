const models = require("../models");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//sign up
exports.signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    console.log(errors);
    try {
        const newUser = new models.User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            alamat: req.body.alamat,
            noHP: req.body.noHP,
        });
        await newUser.save();

        res.status(201).json({
            message: "Account has been created successfully",
            data: newUser.dataValues,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

//sign in
exports.signIn = async (req, res, next) => {
    //mendapatkan nim dari request query
    const { email, password } = req.body;

    try {
        await models.User.findOne({
            where: { email: email },
        }).then((user) => {
            if (!user) {
                res.status(400).json({
                    message: "User tidak terdaftar.",
                });
            } else if (!bcrypt.compareSync(password, user.password)) {
                res.status(400).json({
                    message: "Password salah",
                });
            } else {
                const token = jwt.sign(
                    { _username: user.username },
                    process.env.SECRET_TOKEN
                );

                res.header("auth-token", token).json({
                    message: "Berhasil login",
                    data: user,
                });
            }
        });
    } catch (error) {
        throw error;
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const username = req.query.username;
        console.log("ini adalah ID.. ", username);
        const data = await models.User.findAll({
            where: { username: username },
        });
        console.log(data);
        if (data.length > 0) {
            res.status(200).json({
                message: `Data ditemukan`,
                data,
            });
        } else {
            res.status(404).json({
                message: `Data tidak ditemukan`,
                data: data || null,
            });
        }
    } catch (err) {
        err.status = 400;
        next(err);
    }
};

exports.validate = (kategori) => {
    switch (kategori) {
        case "signup":
            return [
                body("username", "username harus dimasukkan.").exists(),
                body("email", "email tidak valid").exists().isEmail(),
                body("noHP", "Nomor hp tidak valid").optional().isNumeric(),
                body("alamat").optional().isString(),
            ];
    }
};
