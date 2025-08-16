const {userModel} = require("./models/user")

const registerUser = async (req, res) => {
    const {email, userName, password} = req.body;
    const registeredUser = await userModel.create({
        email,
        userName,
        password
    })
};

const loginUser = async (req, res) => {

};

module.exports = { registerUser, loginUser};