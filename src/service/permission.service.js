const pool = require("../app/detabase")

class PermissionService {
  /**
   * @description 查询动态权限
   * @param {String} resouseNmae
   * @param {String} momentId
   * @param {String} userId
   * @returns Promise
   */
  async checkPermission(resouseNmae, momentId, userId) {
    const statement = `SELECT * FROM ${resouseNmae} WHERE id = ? AND user_id = ?`
    const [result] = await pool.execute(statement, [momentId, userId])
    return result
  }
}

module.exports = new PermissionService()
