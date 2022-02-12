const models = require("../models");

exports.index = async (req, res, next) => {
    try {
        const kategory = await models.Category.findAll({}).then((user) => {
            if (user.length < 1) {
                const err = new Error("Tidak ada data");
                err.status = 201;
                throw err;
            }
        });

        res.status(200).json({
            message: "Data semua kategori",
            data: kategory,
        });
    } catch (error) {
        next(error);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const kategory = await models.Category.findOne({ where: { id } });
        res.status(200).json({
            message: "Data semua kategori",
            data: kategory,
        });
    } catch (error) {
        next(error);
    }
};

//create category

exports.create = async (req, res, next) => {
    try {
        const data = req.body;

        const newKategori = new models.Category({
            category: data.category,
        });

        await newKategori.save();

        res.json({
            message: "Produk berhasil ditambahkan.",
            data: newKategori,
        });
    } catch (err) {
        next(err);
    }
};

//update
exports.update = async (req, res, next) => {
    try {
        const data = req.body;
        const id = req.params.id;
        await models.Category.update(data, {
            where: { id: id },
        });
        const updatedData = await models.Category.findOne({
            where: { id: id },
        });
        res.status(202).json({
            message: "Update was accepted",
            data: updatedData,
        });
    } catch (error) {
        next(error);
    }
};
//delete
exports.destroy = async (req, res, next) => {
    try {
        const id = req.params.id;

        await models.Category.destroy({
            where: {
                id: id,
            },
        }).then(function (deletedRecord) {
            if (deletedRecord) {
                res.status(200).json({ message: "Deleted successfully" });
            } else {
                res.status(201).json({ message: "No content" });
            }
        });
    } catch (error) {
        next(error);
    }
};
