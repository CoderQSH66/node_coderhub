const pool = require("../app/detabase")

class LoginService {
  /** 验证用户是否存在 */
  async isExists(username) {
    try {
      const statement = "select * from user where name = ?"
      const [results] = await pool.execute(statement, [username])
      return results
    } catch (error) {
      return error
    }
  }
}

module.exports = new LoginService()
