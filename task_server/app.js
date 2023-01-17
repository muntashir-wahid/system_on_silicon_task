const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);

app.all("*", (req, _, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server`);

  err.statusCode = 404;
  err.status = "fail";

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
