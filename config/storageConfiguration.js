const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (err, file, cb) {
        cb(null, "public/assets/images");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + "_" + file.originalname);
        console.log(uniqueSuffix);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg "
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
    "image"
);

module.exports = upload;
