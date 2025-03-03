import pool from "../config/database.js";

class Likes {
  static async getAllLikesOfPost(postId) {
    const result = await pool.query("Select * from likes where post_id = ?", [
      postId,
    ]);
    return result[0];
  }
  static async likeAPost(postId, userId) {
    const result = await pool.query(
      "Insert into likes (user_id,post_id) values (?,?) on duplicate key update id=id",
      [userId, postId]
    );
    return result[0];
  }
  static async unLikeAPost(postId, userId) {
    const result = await pool.query(
      "delete from likes where user_id = ? and post_id = ?",
      [userId, postId]
    );
    return result[0];
  }
}

export default Likes;
