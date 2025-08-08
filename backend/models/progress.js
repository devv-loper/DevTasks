const mongoose = require("mongoose");
const { number } = require("zod");
const Schema = mongoose.Schema;

const progressSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["DSA", "Development", "github", "CP"],
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    hours:{
        type: Number,
        required: true
    },
    questions:{
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const progressModel = mongoose.model("Progress", progressSchema);

module.exports = {progressModel};