const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ messge: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
        req.user = verified;

        next();
    } catch (error) {
        res.status(400).json({
            message: "Invalid Token",
        });
    }
};
