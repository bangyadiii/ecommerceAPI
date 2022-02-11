const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.email = decoded.email;
        });

        next();
    } catch (error) {
        res.status(400).json({
            message: "Invalid Token",
        });
    }
};
