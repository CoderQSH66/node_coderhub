const UserService = require("../service/user.service")
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
}

module.exports = new UserController()
