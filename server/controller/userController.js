const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")


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
// 


const product=(req,res)=>{
  if(req.cookies.token){
    console.log(req.cookies.token);
    
    res.send("ok")
  }
  else{
    res.redirect("http://localhost:5173/home")
  }
}


module.exports ={register,product}