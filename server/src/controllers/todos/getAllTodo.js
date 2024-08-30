const pool = require("../../db/config");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/async_handler");

const getAllTodos = asyncHandler(async (req, res) => {
  const query = "SELECT * from todos";

  const [rows] = await pool.query(query);

  return res
    .status(200)
    .json(new ApiResponse(200, rows, "Todos fetched successfully"));
});

module.exports = getAllTodos;
