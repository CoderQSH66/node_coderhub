const jwt = require("jsonwebtoken")
const { privateKey } = require("../config/secretKey")

class LoginController {
  /** 颁发token */
  sign(ctx, next) {
    const payload = ctx.request.body
    const token = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: 60 * 60 * 24
    })

    ctx.body = {
      code: 200,
      msg: "登录成功",
      data: {
        id: ctx.request.body.id,
        name: ctx.request.body.name,
        token
      }
    }
  }

  /** 验证token */
  // verify(ctx, next) {
  //   const token
  // }
}

module.exports = new LoginController()
