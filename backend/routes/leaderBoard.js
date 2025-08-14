const { Router } = require("express");
const { authMiddleware } = require("../middleware/requireAuth");
const { leaderBoardModel } = require("../models/leaderBoard");
const user = require("./user");

const leaderBoardRouter = { Router };


leaderBoardRouter.get("/user/:user", authMiddleware, async(req, res) => {
    try{
        const userId = req.userId;
        const leaderBoard = await userModel.findById(userId);

        if(!leaderBoard){
            return res.status(404).json({
                message: "User not found!"
            })
        } res.status(200).json(leaderBoard)
    } catch(error){
        res.status(500).json({message:"Internal server error", error})
    }

})
leaderBoardRouter.get("/XP", authMiddleware, async (req, res) => {
    try{
        const totalXP = req.body;
        const userXP = await leaderBoardModel.find(totalXP);
        if(!userXP){
            return res.status(400).json({message:"XP not available"})
        }
    } catch(error){
        res.status(500).json({message:"Internal server error", error})
    }
})

leaderBoardRouter.get("/type/:type", authMiddleware, async (req, res) => {
    try{

    } catch(error){
        
    }
})


module.exports = {
    progressRouter: progressRouter
}

