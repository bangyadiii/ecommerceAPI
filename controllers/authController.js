const models = require("../models");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//sign up
exports.signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const newUser = new models.User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            alamat: req.body.alamat,
            noHP: req.body.noHP,
        });
        const apa = await newUser.save();
        console.log(apa);
        res.status(201).json({
            message: "Account has been created successfully",
            data: newUser.dataValues,
        });
    } catch (error) {
        next(error);
    }
};

//sign in
exports.signIn = async (req, res, next) => {
    //mendapatkan nim dari request query

    try {
        const user = await models.User.findOne({
            where: { email: req.body.email },
        }).then(async (user) => {
            if (!user) {
                const error = new Error("Email tidak terdaftar.");
                error.status = 400;
                throw error;
            }
            return user;
        });

        const match = user.validPassword(req.body.password);
        if (match === false) {
            const error = new Error("Password salah");
            error.status = 400;
            throw error;
        }
        const token = jwt.sign(
            { _id: user.id, _email: user.email },
            process.env.ACCESS_SECRET_TOKEN,
            {
                expiresIn: "30s",
            }
        );

        const refreshToken = jwt.sign(
            {
                _id: user.id,
                _email: user.email,
            },
            process.env.REFRESH_ACCESS_TOKEN,
            {
                expiresIn: "1d",
            }
        );

        await user.update({ refresh_token: refreshToken });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.header("Authorization", token).json({ token });
    } catch (error) {
        next(error);
    }
};

exports.logout = () => {};

exports.getUserByUsername = async (req, res, next) => {
    try {
        const username = req.query.username;
        const data = await models.User.findAll({
            where: { username: username },
            attributes: ["username", "alamat", "noHP"],
        });
        if (data.length > 0) {
            res.status(200).json({
                message: `Data ditemukan`,
                data,
            });
        } else {
            const error = new Error("Data tidak ditemukan.");
            error.status = 400;
            throw error;
        }
    } catch (err) {
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
