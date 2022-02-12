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
            nama: req.body.nama,
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
        if (!match)
            return res.status(400).json({
                message: "password salah",
            });
        // token = "";
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

exports.logout = async (req, res, next) => {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token)
        return res.status(204).json({ message: "No token found" });

    try {
        const user = await models.User.findOne({
            where: {
                refresh_token,
            },
        });
        if (!user) return res.send(204).json({ message: "No token found" });

        await user.update({ refresh_token: null }, { where: { id: user.id } });

        res.clearCookie("refresh_token");
        res.status(200).json({
            message: "logout succcessful",
        });
    } catch (error) {
        next(error);
    }
};

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

exports.getTransactions = async (req, res, next) => {
    try {
        const data = await models.User.findOne({
            where: {
                id: req.id,
            },
            attributes: ["nama", "email", "username", "alamat"],
            include: "Transaction",
        });
        if (!data) throw new Error("Data tidak ada");

        res.status(200).json({
            message: "Data Transaksi berhasil didapatkan.",
            data: data,
        });
    } catch (error) {
        next(error);
    }
};
