// instansiasi
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const port = 4000;
const app = express();
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const morgan = require("morgan");
const upload = require("./helper/fileUpload");
const cookieParser = require("cookie-parser");

//setup
app.use(cors());

app.use(upload);

app.use(bodyParser.json());

app.use(morgan("dev"));

app.use("/assets", express.static("public/assets/images"));
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

//error handling

//default error / endpoint error
app.use((req, res, next) => {
    const err = new Error("Not Found!");
    err.status = 404;
    next(err);
});
app.use(cookieParser());
//send error
app.use((error, req, res, next) => {
    const message = error.message;
    const status = error.status || 500;
    const data = error.data || null;

    res.status(status).json({
        message,
        data,
    });
});
// db.authenticate().then(() => console.log("connected to database"));
app.listen(port, () =>
    console.log(`server has been started on http://localhost:${port}  ...`)
);
