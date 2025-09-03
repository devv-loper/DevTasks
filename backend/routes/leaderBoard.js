const { Router } = require("express");
const requireAuth = require("../middleware/requireAuth");
const { leaderBoardModel } = require("../models/leaderBoard");
const { userModel } = require("../models/user");

const leaderBoardRouter = Router();


leaderBoardRouter.get("/user/:userId", requireAuth, async (req, res) => {
    try{
        const { userId } = req.params;
        const leaderBoard = await leaderBoardModel.findOne({ userId }).populate("userId", "userName email");

        if(!leaderBoard){
            return res.status(404).json({ message: "Leaderboard not found" });
        }
        return res.status(200).json(leaderBoard)
    } catch(error){
        return res.status(500).json({message:"Internal server error", error})
    }

})
leaderBoardRouter.get("/XP", requireAuth, async (req, res) => {
    try{
        const userXP = await leaderBoardModel.findOne({userId: req.userId});
        if(!userXP){
            return res.status(404).json({message:"XP not available"})
        }
        return res.status(200).json({ totalXP: userXP.totalXP, weeklyXP: userXP.weeklyXP, monthlyXP: userXP.monthlyXP })
    } catch(error){
        return res.status(500).json({message:"Internal server error", error})
    }
})

leaderBoardRouter.get("/type/:type", requireAuth, async (req, res) => {
    try{
        const { type } = req.params;
        const validTypes = ["dsa", "competitiveProgramming", "development", "github"];
        if(!validTypes.includes(type)){
            return res.status(400).json({ message:"Not a valid type" });
        }

        // Return a simple ranking across users for the given metric
        const sortField =
          type === "dsa" ? "dsaProgress" :
          type === "competitiveProgramming" ? "cpProgress" :
          type === "development" ? "devProgress" :
          "githubContribution";

        const board = await leaderBoardModel.find({}, { userName: 1, [sortField]: 1, totalXP: 1 })
          .sort({ [sortField]: -1, totalXP: -1 })
          .limit(100);
        if(!board || board.length === 0){
            return res.status(404).json({ message:"No leaderboard data found for this type" });
        }
        return res.status(200).json(board)
    } catch(error){
        return res.status(500).json({ message:"Internal Server Error", error })
    }
})


module.exports = { leaderBoardRouter };

