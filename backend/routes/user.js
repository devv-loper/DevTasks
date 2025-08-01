const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "your jwt password"
const userRouter = Router();

userRouter.post("/register", async (req, res) => {
    const {email, userName, password} = req.body;

        if(!email || !userName || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    
    const existingUser = await authModel.findOne({email});
    if(existingUser){
        res.status(400).json({
            message: "user already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    //
    console.log(hashedPassword);
    const user = await authModel.create({
        email: email,
        userName: userName,
        password: hashedPassword
    })
    return res.status(201).json({
        _id: user._id,
        email: user.email,
        userName: user.userName,
        message:"Your are successfully registered"
    })

});

userRouter.post("/login", async (req, res) => {
    const {userName, password} = req.body;

    if(!userName || !password){
        res.json({
            message: "All field are required"
        })
    }
    const member = await authModel.findOne({
        userName: userName
    })

    if(!member){
        return res.json({
            message: "No user Found"
        })
    }

    const passwordCheck = await bcrypt.compare(password, member.password);

    if(passwordCheck){
        const token = jwt.sign({
            id: member._id.toString()
        },JWT_AUTH_PASSWORD)
        res.json({
            token
        })
    } else{
        res.status(400).json({
            message: "invalid Credentials",
        })
    }

});

module.exports = {
    userRouter: userRouter
}