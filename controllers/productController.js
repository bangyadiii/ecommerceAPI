const { validationResult } = require("express-validator");
const { Product } = require("../models");

//create product

exports.create = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const err = new Error();
        err.message = "Invalid input tidak sesuai.";
        err.status = 400;
        err.data = error.array();
        throw err;
    }

    try {
        const data = req.body;
        data.image = req.file.filename;

        const newproduct = new Product({
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

exports.getAll = async (req, res, next) => {
    try {
        const product = await Product.findAll({});
        res.status(200).json({
            message: "Data semua product ditemukan.",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};
