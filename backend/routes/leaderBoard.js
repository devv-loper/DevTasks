const { Router } = require("express");
const  requireAuth  = require("../middleware/requireAuth");
const leaderBoardModel = require("../models/leaderBoard");
const {userModel} = require("../models/user");

const leaderBoardRouter = Router();


leaderBoardRouter.get("/user/:userId", requireAuth, async(req, res) => {
    try{
        const { userId } = req.params;
        const leaderBoard = await userModel.findById(userId);

        if(!leaderBoard){
            return res.status(400).json({
                message: "User not found!"
            })
        } res.status(200).json(leaderBoard)
    } catch(error){
        return res.status(500).json({message:"Internal server error", error})
    }

})
leaderBoardRouter.get("/XP", requireAuth, async (req, res) => {
    try{
        const userXP = await leaderBoardModel.find({userId: req.userId});
        if(!userXP || userXP.length === 0){
            return res.status(400).json({message:"XP not available"})
        }
        return res.status(200).json(userXP)
    } catch(error){
        return res.status(500).json({message:"Internal server error", error})
    }
})

leaderBoardRouter.get("/type/:type", requireAuth, async (req, res) => {
    try{
        const { type } = req.params;
        const validTypes = ['dsa', 'competitiveProgramming', 'development', 'github'];
        if(!validTypes.includes(type.toLowerCase())){
            return res.status(400).json({
                message:"Not a valid type"
            })
        }

        const LeaderBoard = await leaderBoardModel.find({userId: req.userId, type});
        if(!LeaderBoard || LeaderBoard.length === 0){
            return res.status(400).json({
                message:"No leaderBoard Data found for this type"
            });
        }
        res.status(200).json(LeaderBoard)
    } catch(error){
        return res.status(500).json({
            message:"Internal Server Error", error
        })
    }
})


module.exports = {
    leaderBoardRouter: leaderBoardRouter
}

