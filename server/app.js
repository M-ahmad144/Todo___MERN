const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/api/users");
const globalErrorHandlerMiddleware = require("./middlewares/globalErrorHandlerMiddleware");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new errorHandler(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandlerMiddleware);

module.exports = app;
