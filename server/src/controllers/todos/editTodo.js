const pool = require("../../db/config");
const ApiErrors = require("../../utils/apiErrors");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/async_handler");

const editTodo = asyncHandler(async (req, res) => {
  const { id, title, description } = req.body;

  let query = "UPDATE todos SET";
  const fields = [];
  const values = [];

  if (title) {
    fields.push("title = ?");
    values.push(title);
  }

  if (description) {
    fields.push("description = ?");
    values.push(description);
  }

  if (fields.length === 0) {
    throw new ApiErrors(400, "Please provide all the fields");
  }

  query += ` ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  const [result] = await pool.execute(query, values);

  if (result.affectedRows < 1) {
    throw new ApiErrors(501, "An error occured while updating todo");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        result,
        `Todo with id ${id} has been updated successfully`
      )
    );
});

module.exports = editTodo;
