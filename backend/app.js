const express = require("express");

const cors = require("cors");

const userRoute = require("./routes/userRoute");
const projectRoute = require("./routes/projectRoute");
const taskRoute = require("./routes/taskRoute");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./golobalErrorHandler");

const app = express();

//Body parser
app.use(express.json());

//Cors middleware
app.use(cors());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/tasks", taskRoute);

app.get("/", (req, res) => {
  res.send("Hello from express server.");
});

// app.all("*", (req, res, next) => {
//   next(new AppError("No routes found.", 404, 0));
// });

app.use(globalErrorHandler);

module.exports = app;
