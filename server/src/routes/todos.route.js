const express = require("express");
const getAllTodos = require("../controllers/todos/getAllTodo");
const addTodo = require("../controllers/todos/addTodo");
const editTodo = require("../controllers/todos/editTodo");
const deleteTodo = require("../controllers/todos/deleteTodo");

const router = express.Router();

router.route("/getAllTodos").get(getAllTodos);
router.route("/addTodo").post(addTodo);
router.route("/editTodo").post(editTodo);
router.route("/deleteTodo/:id").post(deleteTodo);

module.exports = router;
