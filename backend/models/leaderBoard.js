const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leaderBoardSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    userName: {
        type: String,
        unique: true
    },

    totalXP: {
        type: String,
        default: 0
    },
    devProgress: {
        type: number,
        default: 0
    },

    dsaProgress:{
        type: number,
        default: 0
    },

    githubContribution: {
        type: number,
        default: 0
    },

    cpProgress: {
        type: number,
        default: 0
    },

    currentStreak: {
        type: number,
        default: 0
    },

    highestStreak: {
        type: number,
        default: 0
    },

    weeklyXP: {
        type: number,
        default: 0
    },

    monthlyXP: {
        type: number,
        default: 0
    },
    
    badges: {
        type: String
    },

    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const leaderBoardModel = mongoose.model('LeaderBoard', leaderBoard);

module.exports = {leaderBoardModel};