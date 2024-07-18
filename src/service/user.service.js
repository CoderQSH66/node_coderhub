const connection = require("../app/detabase")
class UserService {
  /** 注册sql */
  async register(registerInfo) {
    try {
      const { name, telphone, password } = registerInfo
      const statement = `insert into user(name,telphone,password) values (?,?,?)`
      const [result] = await connection.execute(statement, [name, telphone, password])
      return result
    } catch (error) {
      console.log(error)
      return error
    }
  }
  /** 验证用户是否存在 */
  async isExists(username) {
    const statement = `select * from user where name = ?`
    const [result] = await connection.execute(statement, [username])
    return result
  }
}

module.exports = new UserService()
