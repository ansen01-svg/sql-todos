require("dotenv").config("./.env");
const app = require("./app");

const port = process.env.PORT || 5000;

const start = () => {
  try {
    app.listen(port, () => console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.error(error, `Error while running server`);
  }
};

start();
