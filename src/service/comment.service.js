const pool = require("../app/detabase")
class CommentService {
  /**
   *
   * @param {object} body {content, momentId, userId, commentId}
   * @returns
   */
  async insertComment(body) {
    const { content, momentId, userId, commentId } = body
    const statement = `INSERT INTO comment(content, moment_id, user_id,comment_id) VALUES(?, ?, ?, ?)`
    const [result] = await pool.execute(statement, [content, momentId, userId, commentId])
    return result
  }
}

module.exports = new CommentService()
