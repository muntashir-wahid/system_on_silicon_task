const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);

module.exports = app;
