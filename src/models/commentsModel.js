import pool from "../config/database.js";

class Comments {
  static async addAComment(postId, userId, comment) {
    const result = await pool.query(
      "Insert into comments(post_id,user_id,parent_id,content) values (?,?,?,?)",
      [postId, userId, comment.parentId, comment.content]
    );
    return result[0];
  }
  static async getComment(postId, commentId) {
    const result = await pool.query(
      "Select * from comments where post_id = ? and id=?",
      [postId, commentId]
    );
    return result[0];
  }
  static async getUserComment(postId, userId, commentId) {
    const result = await pool.query(
      "Select * from comments where post_id = ? and user_id = ? and id=?",
      [postId, userId, commentId]
    );
    return result[0];
  }
  static async updateComment(comment) {
    const result = await pool.query(
      "update comments set content=? where id=?",
      [comment.content, comment.id]
    );
    return result[0];
  }
  static async deleteComment(id) {
    const result = await pool.query("delete from comments where id = ?", [id]);
    return result[0];
  }
}

export default Comments;
