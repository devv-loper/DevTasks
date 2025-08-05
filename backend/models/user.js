const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
    email:{type: String, unique: true, required: true},
    userName: {type: String, unique: true, required: true},
    password: {type: String, required: true}
})

const userModel = mongoose.model("User", userSchema);

module.exports = {userModel};