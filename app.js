// instansiasi
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const morgan = require("morgan");
const upload = require("./helper/fileUpload");
const cookieParser = require("cookie-parser");
const transactionRoutes = require("./routes/transaction");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

//setup
app.use(cors({ credentials: true }));

app.use(upload);

app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/category", categoryRoutes);
app.use("/assets", express.static("public/assets/images"));

//error handling

//default error / endpoint error
app.use((req, res, next) => {
    const err = new Error("Not Found!");
    err.status = 404;
    next(err);
});
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
app.listen(PORT, () =>
    console.log(`server has been started on http://localhost:${PORT}  ...`)
);
