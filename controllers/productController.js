const { Product } = require("../models");

//create product

exports.create = async (req, res, next) => {
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
        const product = await Product.findAll({
            limit: 1,
        });
        res.status(200).json({
            message: "Data semua product ditemukan.",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

exports.validate = (kategori) => {};
