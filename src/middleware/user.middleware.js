const UserService = require("../service/user.service")
const { PARAM_IS_NULL, USER_IS_EXISTS } = require("../config/error-cont")
const crypto = require("crypto")
const mad5pwd = require("../utils/mad5pwd")

/**
 * @description 验证注册接口参数
 * @param {obj} ctx 请求上下文
 * @param {next} next 下一个栈中间件
 * @returns
 */
const veifyRgister = async (ctx, next) => {
  // 验证参数是否为空
  const { name, telphone, password } = ctx.request.body
  if (!name || !telphone || !password) {
    ctx.app.emit("error", PARAM_IS_NULL, ctx)
    return
  }
  // 验证用户是否存在
  const res = await UserService.isExists(name)
  if (res.length > 0) {
    ctx.app.emit("error", USER_IS_EXISTS, ctx)
    return
  }
  await next()
}

/**
 * @description 密码加密中间件
 * @param {obj} ctx 请求上下文
 * @param {next} next 下一个栈中间件
 * @returns
 */
const cryptoPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  // md5jiami
  // const md5password = crypto.createHash("md5").update(password).digest("hex")
  ctx.request.body.password = mad5pwd(password)
  await next()
}
module.exports = {
  veifyRgister,
  cryptoPassword
}
