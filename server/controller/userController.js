const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, roll, email, password } = req.body;
    console.log(req.body);

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            name: name,
            roll: roll,
            email: email,
            password: hash
        });

        res.status(201).send("User  registered successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(404).send("User  not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
            const token = jwt.sign({ email: email }, 'shhhhh', { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true, secure: false });
            return res.status(200).send("Login successful");
        } else {
            return res.status(401).send("Invalid password");
        }
    } catch (error) {
        return res.status(500).send("Server error");
    }
};
const product=(req,res)=>{
   console.log(req.cookies);
   res.send("ok")   
}


module.exports ={register,login,product}