const pool = require("../app/detabase")
class CommentService {
  /**
   * @description 插入动态评论
   * @param {object} body {content, momentId, userId, commentId}
   * @returns
   */
  async insertComment(body) {
    const { content, momentId, userId, commentId } = body
    const statement = `INSERT INTO comment(content, moment_id, user_id,comment_id) VALUES(?, ?, ?, ?)`
    const [result] = await pool.execute(statement, [
      content,
      momentId,
      userId,
      commentId
    ])
    return result
  }

  /**
   * @description 删除评论
   * @param {Number} id
   * @returns
   */
  async deleteComment(id) {
    const statement = `DELETE FROM comment WHERE id = ?`
    const [result] = await pool.execute(statement, [id])
    return result
  }
}

module.exports = new CommentService()
