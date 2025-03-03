import pool from "../config/database.js";

class User {
  static async create(user) {
    const { name, username, password } = user;
    const [result] = await pool.query(
      "INSERT INTO users (name,username,password) values (?,?,?)",
      [name, username, password]
    );
    return result.insertId;
  }
  static async getUserByUserName(username) {
    const [result] = await pool.query(
      "select * from users where username = ?",
      [username]
    );
    return result;
  }
  static async getUserById(id) {
    const [result] = await pool.query("select * from users where id = ?", [id]);
    return result;
  }
}

export default User;
