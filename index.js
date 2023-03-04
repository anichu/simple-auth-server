const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
require("colors");
require("dotenv").config();
const { connectDB } = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/user/", userRouter);

app.get("/", async (req, res) => {
	res.send("server is running");
});

app.listen(port, () => {
	console.log("server is running");
});
