require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// the routes
const { userRouter } = require("./routes/user");
const { progressRouter } = require("./routes/progress");
const { leaderBoardRouter } = require("./routes/leaderBoard");

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));

app.get("/", (req, res) => res.json({ ok: true }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/progress", progressRouter);
app.use("/api/v1/leaderboard", leaderBoardRouter);

async function main() {
    const { MONGO_URL } = process.env;
    if (!MONGO_URL) {
        console.error("MONGO_URL is not set");
        process.exit(1);
    }
    await mongoose.connect(MONGO_URL);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
}

main();