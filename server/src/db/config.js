const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.SQL_HOST || "localhost",
  user: process.env.SQL_USER || "root",
  password: process.env.SQL_PASSWORD || "yourpassword",
  database: process.env.SQL_DATABASE || "todos",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
