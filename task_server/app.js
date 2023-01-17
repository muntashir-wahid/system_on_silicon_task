const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorControllers");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);

app.all("*", (req, _, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 400));
});

app.use(globalErrorHandler);

module.exports = app;
