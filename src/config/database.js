import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "dbuser",
  password: "dbpassword",
  database: "social",
});

export default pool;
