import pool from "../config/database.js";

class Post {
  static async getAll() {
    const [posts] = await pool.query("select * from posts");
    return posts;
  }
  static async getPostById(id) {
    const [posts] = await pool.query("select * from posts where id = ?", [id]);
    return posts[0];
  }
  static async create(post) {
    const { content, imageUrl, userId } = post;
    const [result] = await pool.query(
      "INSERT INTO posts (content,image_url,user_id) values (?,?,?)",
      [content, imageUrl, userId]
    );
    return result.insertId;
  }
  static async update(id, post) {
    const { content, imageUrl } = post;
    const [result] = await pool.query(
      "update posts set content=?,image_url=?, updated_at=? where id=?",
      [content, imageUrl, new Date(Date.now()), id]
    );
    return result;
  }

  static async delete(id) {
    await pool.query("Delete from posts where id = ?", [id]);
  }
}

export default Post;
