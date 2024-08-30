const express = require("express");
const cors = require("cors");
const todoRouter = require("./routes/todos.route");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT,
  })
);
app.use(express.json());
app.use("/api/v1/todos", todoRouter);

module.exports = app;
