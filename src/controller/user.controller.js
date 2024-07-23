const UserService = require("../service/user.service")
const FileService = require("../service/file.service")
const path = require("path")
const fs = require("fs")

class UserController {
  /** 注册中间件 */
  async registerMiddleware(ctx, next) {
    // 获取请求体数据
    const body = ctx.request.body

    // 插入数据库
    const result = await UserService.register(body)
    if (result.errno) {
      ctx.app.emit("error", result.errno, ctx)
      return
    }
    // 返回响应
    ctx.body = {
      code: 200,
      message: "注册成功",
      data: result
    }
  }
  /** 获取用户头像 */
  async getAvatar(ctx, next) {
    const { id } = ctx.params
    const result = await FileService.getAvatar(id)
    const { filename, mimetype } = result.at(-1)
    const avatar_path = path.join(__dirname, `../../public/uploads/${filename}`)
    ctx.type = mimetype
    ctx.body = fs.createReadStream(avatar_path)
  }
}

module.exports = new UserController()
