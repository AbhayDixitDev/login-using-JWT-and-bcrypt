const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/LoginSystem")
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => {
        console.error("Database connection error:", err);
    });

app.use("/user", userRouter);

app.listen(9000, () => {
    console.log("Server is running on port 9000");
});