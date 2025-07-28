const express = require("express");

// the routes
const {authRouter} = require("./routes/auth");
const {progressRouter} = require("./routes/progress");
const {leaderBoardRouter} = require("./routes/leaderBoard");

const app = express();

app.use(express.json());
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/progress", progressRouter);
app.use("/api/v1/leaderboard",leaderBoardRouter);
