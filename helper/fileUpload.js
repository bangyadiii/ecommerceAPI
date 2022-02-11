const multer = require("multer");
const { format } = require("path/posix");

const storage = multer.diskStorage({
    destination: function (err, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        let format = file.originalname.split(".");
        cb(null, "S4L_IMG_" + uniqueSuffix + "." + format[format.length - 1]);
        console.log(uniqueSuffix);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
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
