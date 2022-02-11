const models = require("../models");
const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res, next) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) {
            const error = new Error("Unauthorization");
            error.status = 403;
            throw error;
        }

        const user = await models.User.findOne({
            where: { refresh_token: refresh_token },
        });
        if (!user) res.status(403).json({ message: "Forbidden" });

        jwt.verify(
            refresh_token,
            process.env.REFRESH_ACCESS_TOKEN,
            (err, decoded) => {
                if (err) {
                    const error = new Error("Forbidden");
                    error.status = 401;
                    throw error;
                }

                const accessToken = jwt.sign(
                    {
                        _id: user.id,
                        _email: user.email,
                    },
                    process.env.ACCESS_SECRET_TOKEN,
                    {
                        expiresIn: "20s",
                    }
                );
                res.status(200).json({
                    accessToken,
                });
            }
        );
    } catch (error) {
        next(error);
    }
};
