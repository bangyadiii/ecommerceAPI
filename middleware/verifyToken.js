const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
//
exports.auth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(400).json({ message: "Access denied" });
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
        next();
    } catch (error) {
        res.status(error.status).json({
            message: error.message,
        });
    }
};
