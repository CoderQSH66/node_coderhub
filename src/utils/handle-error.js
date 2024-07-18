const app = require("../app")

/** 错误监听 */
app.on("error", (err, ctx) => {
  const code = err
  let msg = ""
  switch (code) {
    case -1001:
      msg = "用户名、手机号、密码不能为空！"
      break
    case -1002:
      msg = "用户已存在，请重新输入！"
      break
    case -1003:
      msg = "用户不存在，请重新输入！"
      break
    case -1004:
      msg = "密码输入错误，请重新输入！"
      break
    case -1005:
      msg = "token过期或无效，请重新登录！"
      break
    case -2001:
      msg = "数据库操作错误，请重试！"
      break
    case -4001:
      msg = "没有操作该资源的权限！"
      break
    default:
      msg = "未知错误"
  }
  ctx.body = {
    code: code,
    message: msg,
    data: null
  }
})
