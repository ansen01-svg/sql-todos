const pool = require("../../db/config");
const ApiErrors = require("../../utils/apiErrors");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/async_handler");

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiErrors(401, "Please provide id");
  }

  const query = "DELETE FROM todos WHERE id = ?";

  const [result] = await pool.execute(query, [id]);
  console.log(result);

  if (result.affectedRows < 1) {
    throw new ApiErrors(501, "There was an error while deleting the todo");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, result, `Todo with id ${id} deleted successfully`)
    );
});

module.exports = deleteTodo;
