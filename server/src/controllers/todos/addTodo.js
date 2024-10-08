const pool = require("../../db/config");
const ApiErrors = require("../../utils/apiErrors");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/async_handler");

const addTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiErrors(400, "Please provide title and description");
  }

  const query = `INSERT INTO todos (\`title\`, \`description\`) VALUES (?, ?)`;

  const [result] = await pool.execute(query, [title, description]);

  if (result.affectedRows < 1) {
    throw new ApiErrors(501, "An error occured while adding todo");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Todo added successfully"));
});

module.exports = addTodo;
