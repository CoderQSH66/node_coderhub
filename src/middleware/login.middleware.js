const { PARAM_IS_NULL, USER_NOT_EXISTS, PWD_IS_ERROR, TOKEN_ERROR } = require("../config/error-cont")
const LoginService = require("../service/login.service")
const mad5pwd = require("../utils/mad5pwd")
const jwt = require("jsonwebtoken")
const { publicKey } = require("../config/secretKey")
/**
 * @description 登录验证中间件
 * @param {obj} ctx
 * @param {next} next
 * @returns Promise
 */
const verifyLogin = async (ctx, next) => {
  // 1、验证用户输入参数是否为空
  const { name, password } = ctx.request.body
  if (!name || !password) {
    return ctx.app.emit("error", PARAM_IS_NULL, ctx)
  }
  // 2、验证用户是否存在
  const result = await LoginService.isExists(name)
  if (result.length === 0) {
    return ctx.app.emit("error", USER_NOT_EXISTS, ctx)
  }
  // 3、验证密码是否正确
  if (result[0].password !== mad5pwd(password)) {
    return ctx.app.emit("error", PWD_IS_ERROR, ctx)
  }
  ctx.request.body = Object.assign(ctx.request.body, { id: result[0].id })
  await next()
}

/**
 * @description token验证中间件
 * @param {obj} ctx
 * @param {next} next
 * @returns Promise
 */
const verifyToken = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    return ctx.app.emit("error", TOKEN_ERROR, ctx)
  }
  const token = ctx.headers.authorization.replace("Bearer ", "")
  jwt.verify(token, publicKey, { algorithm: "RS256" }, (err, decoded) => {
    if (err) {
      return ctx.app.emit("error", TOKEN_ERROR, ctx)
    } else {
      ctx.decoded = decoded
    }
  })
  await next()
}
module.exports = {
  verifyLogin,
  verifyToken
}
