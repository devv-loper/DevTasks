const express = require("express");

// the routes
const {userRouter} = require("./routes/user");
const {progressRouter} = require("./routes/progress");
const {leaderBoardRouter} = require("./routes/leaderBoard");

const app = express();

app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/progress", progressRouter);
app.use("/api/v1/leaderboard",leaderBoardRouter);
