const models = require("../models/");

exports.create = async (req, res, next) => {
    try {
        const { productId, product_qty } = req.body;
        const user = await models.User.findOne({
            where: { id: req.id },
        });
        if (!user) return res.status(403).json({ message: "Forbidden" });

        const data = await models.Transaction.create({
            productId,
            product_qty,
            userId: user.id,
        });
        res.status(200).json({
            message: "Berhasil menambahkan transaksi",
            data: data,
        });
    } catch (error) {
        next(error);
    }
};
