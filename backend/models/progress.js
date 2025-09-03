const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const progressSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            // Align with routes: 'DSA', 'development', 'competitiveProgramming', 'github'
            enum: ["DSA", "development", "competitiveProgramming", "github"],
            required: true,
        },
        hours: {
            type: Number,
            required: true,
            min: 0,
        },
        questions: {
            type: Number,
            min: 0,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const progressModel = mongoose.model("Progress", progressSchema);

module.exports = { progressModel };