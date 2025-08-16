require("dotenv").config();
const bcrypt = require("bcrypt");
const {userModel} = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

if(!JWT_USER_PASSWORD){
    throw new Error("JWT_USER_PASSWORD is not set in envirnoment variables.")
}

const registerUser = async (req, res) => {
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
        return res.status(500).json({
            message:"Server error", error
        })
    }
};

const loginUser = async (req, res) => {
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
            const token = jwt.sign({
                id: member._id.toString()
            },JWT_USER_PASSWORD, {expiresIn: "7d"})
            return res.json({
                token,
                user: {
                    _id: member._id,
                    email: member.email,
                    userName: member.userName
                }
            });
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
};

module.exports = { registerUser, loginUser};