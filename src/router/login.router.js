const Router = require("@koa/router")
const LoginController = require("../controller/login.controller")
const { verifyLogin, verifyToken } = require("../middleware/login.middleware")
// 创建router对象
const loginRouter = new Router({ prefix: "/login" })

// 注册router中间件
loginRouter.post("/", verifyLogin, LoginController.sign)
loginRouter.get("/:id", verifyToken, (ctx, next) => {
  console.log(ctx.decoded)
  ctx.body = ctx.decoded
})

module.exports = loginRouter
