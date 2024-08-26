const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/users");
const tagsRouter = require("./routes/api/tags");
const todoRouter = require("./routes/api/todos");
const globalErrorHandlerMiddleware = require("./middlewares/globalErrorHandlerMiddleware");
const errorHandler = require("./utils/errorHandler");

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use(cors({}));

app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tags", tagsRouter);
app.use("/api/v1/todos", todoRouter);

app.all("*", (req, res, next) => {
  next(new errorHandler(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandlerMiddleware);

module.exports = app;
