const pool = require("../app/detabase")
class FileService {
  /**
   * @decription 上传头像
   * @param {*} userId
   * @param {*} filename
   * @param {*} mimetype
   * @param {*} size
   * @returns
   */
  async uploadAvatar(userId, filename, mimetype, size) {
    const statement = `INSERT INTO avatar(filename, mimetype, size, user_id) VALUES(?, ?, ?, ?)`
    const [result] = await pool.execute(statement, [
      filename,
      mimetype,
      size,
      userId
    ])
    return result
  }

  /**
   * @description 获取头像
   * @param {*} id
   */
  async getAvatar(id) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?`
    const [result] = await pool.execute(statement, [id])
    return result
  }

  /**
   * @description 插入用户头像
   * @param {*} avatar_url
   * @param {*} id
   * @returns
   */
  async insertAvatar(avatar_url, id) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?`
    const [result] = await pool.execute(statement, [avatar_url, id])
    return result
  }
}

module.exports = new FileService()
