const express = require("express");
const todoRouter = require("./routes/todos.route");

const app = express();

app.use(express.json());
app.use("/api/v1/todos", todoRouter);

module.exports = app;
