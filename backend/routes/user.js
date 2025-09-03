const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || process.env.JWT_USER_PASSWORD || "";
const userRouter = Router();
const { userModel } = require("../models/user");

userRouter.post("/register", async (req, res) => {
    try {
        const {email, userName, password} = req.body;

            if(!email || !userName || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        
        const user = await userModel.create({
            email: email,
            userName: userName,
            password: hashedPassword
        })
        return res.status(201).json({
            _id: user._id,
            email: user.email,
            userName: user.userName,
            message:"You are successfully registered"
        })
    } catch(error) {
    return res.status(500).json({ message:"server error", error })
    }

});

userRouter.post("/login", async (req, res) => {
    try{
    const {userName, password} = req.body;

    if(!userName || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    const member = await userModel.findOne({
        userName: userName
    })

    if(!member){
        return res.status(404).json({
            message: "No user found"
        })
    }

    const passwordCheck = await bcrypt.compare(password, member.password);

    if(passwordCheck){
        if (!JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret not configured" });
        }
        const token = jwt.sign({ id: member._id.toString() }, JWT_SECRET, { expiresIn: "7d" });
        return res.json({
            token,
            user: { _id: member._id, email: member.email, userName: member.userName }
        })
    } else{
        return res.status(400).json({
            message: "Invalid credentials",
        })
    }
    } catch(error){
        return res.status(500).json({
            message: "Server error", error
        })
    }

});

module.exports = {
    userRouter: userRouter
}