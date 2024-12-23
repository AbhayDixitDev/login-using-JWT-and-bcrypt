const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const app = express();
const userModel = require("./model/userModel");

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Allow your React app's origin
    credentials: true // Allow credentials (cookies) to be sent
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/LoginSystem")
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => {
        console.error("Database connection error:", err);
    });

app.get("/", (req, res) => {
    res.cookie("name", "value", { httpOnly: true, sameSite: "lax", secure: false });
    res.send("ok");
});

app.get("/product", (req, res) => {
    console.log(req.cookies);
    res.send("ok");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
            const token = jwt.sign({ email },'shhhhh');
            res.cookie("token", token, { httpOnly: true, secure: false });
            return res.status(200).send("Login successful");
        } else {
            return res.status(401).send("Invalid password");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

app.get("/logout",(req, res) => {
    res.clearCookie("token");

    console.log("Logout successful");

    res.status(200).send("Logout successful");
});
const auth = (req, res, next) => {
    if (req.cookies.token) {
        console.log("req.cookies.token", req.cookies.token);
        next();
    } else {
        res.redirect("http://localhost:5173/home");
    }
};
app.use("/user", auth, userRouter);



app.listen(9000, () => {
    console.log("Server is running on port 9000");
});