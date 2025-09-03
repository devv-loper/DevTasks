const {progressModel} = require("../models/progress");

const userProgress = async (req, res, type, allowQuestions = false) => {
    try{
        const userId = req.userId;
        const date = Date.now()
        const {hours, questions} = req.body;

    const progressData = {userId, date, hours, type};

        if(allowQuestions && questions !== undefined) progressData.questions = questions;

    const progress = await progressModel.create(progressData);

        return res.status(201).json({
            message:"Progress added", progress
        });
    } catch(error){
        return res.status(500).json({
            message:"Something went wrong", error
        })
    }
}

const addDsaProgress = async (req, res) => userProgress(req, res, 'DSA', true);

const addCPProgress = async (req, res) => userProgress(req, res, 'CP', true);

const addDevelopmentProgress = async (req, res) => userProgress(req, res, 'development');

const addGithubProgress = async (req, res) => userProgress(req, res, 'github')

module.exports = { addDsaProgress, addGithubProgress, addDevelopmentProgress, addCPProgress };