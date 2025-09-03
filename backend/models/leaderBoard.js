const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leaderBoardSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        userName: {
            type: String,
            unique: true,
            required: true,
        },
        totalXP: {
            type: Number,
            default: 0,
            min: 0,
        },
        devProgress: {
            type: Number,
            default: 0,
            min: 0,
        },
        dsaProgress: {
            type: Number,
            default: 0,
            min: 0,
        },
        githubContribution: {
            type: Number,
            default: 0,
            min: 0,
        },
        cpProgress: {
            type: Number,
            default: 0,
            min: 0,
        },
        currentStreak: {
            type: Number,
            default: 0,
            min: 0,
        },
        highestStreak: {
            type: Number,
            default: 0,
            min: 0,
        },
        weeklyXP: {
            type: Number,
            default: 0,
            min: 0,
        },
        monthlyXP: {
            type: Number,
            default: 0,
            min: 0,
        },
        badges: {
            type: [String],
            default: [],
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const leaderBoardModel = mongoose.model("LeaderBoard", leaderBoardSchema);

module.exports = { leaderBoardModel };