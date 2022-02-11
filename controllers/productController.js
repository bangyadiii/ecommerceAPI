const models = require("../models");
const { body } = require("express-validator");

exports.getAll = async (req, res, next) => {
    try {
        const product = await models.Product.findAll({
            limit: 10,
        });
        res.status(200).json({
            message: "Data semua product ditemukan.",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};
exports.getOne = async (req, res, next) => {
    try {
        const product = await models.Product.findOne(req.params.id);
        res.status(200).json({
            message: "Data semua product ditemukan.",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

//create product

exports.create = async (req, res, next) => {
    try {
        const data = req.body;
        data.image = req.file.filename;

        const newproduct = new models.Product({
            nama_produk: data.nama_produk,
            deskripsi_singkat: data.deskripsi_singkat,
            deskripsi_lengkap: data.deskripsi_lengkap,
            stok: data.stok,
            harga: data.harga,
            image: data.image,
        });

        await newproduct.save();
        // console.log(newproduct);

        res.json({
            message: "Produk berhasil ditambahkan.",
            data: newproduct,
        });
    } catch (err) {
        next(err);
    }
};

//update
exports.update = async (req, res, next) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await models.Product.update(data, {
            where: { id: id },
        });
        const updatedData = await models.Product.findOne({
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
    const id = req.params.id;

    try {
        await models.Product.destroy({
            where: {
                id: id,
            },
        }).then(function (deletedRecord) {
            if (deletedRecord) {
                res.status(200).json({ message: "Deleted successfully" });
            } else {
                res.status(400).json({ message: "record not found" });
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.validate = (kategori) => {
    switch (kategori) {
        case "create-product":
            return [
                body("nama_produk").exists().isString(),
                body("deskripsi_singkat").optional().isString(),
                body("deskripsi_lengkap").exists().isString(),
                body("harga").exists().isNumeric(),
                body("image").exists(),
            ];

        default:
            break;
    }
};
