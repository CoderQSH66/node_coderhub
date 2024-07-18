const Koa = require("koa")
const Router = require("@koa/router")
const session = require("koa-session")

// 创建app应用程序
const app = new Koa()

// 创建router对象
const router = new Router({ prefix: "/login" })

// 注册router中间件
router.get("/", (ctx, next) => {
  // 1、登录成功，服务器设置session
  ctx.session.slogan = "my_key"
  ctx.body = "登录成功"
})
router.get("/list", (ctx, next) => {
  // 2、发送请求，验证session
  if (ctx.session.slogan === "my_key") {
    ctx.body = "获取信息成功"
  } else {
    ctx.body = "获取信息失败"
  }
})

// session加盐（配置加密规则）
app.keys = ["some secret hurr", "some secret key"]

// 添加session中间件
app.use(
  session(
    {
      key: "sessionid",
      maxAge: 60 * 1000,
      signed: true
    },
    app
  )
)
// app中添加路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 监听启动服务
app.listen(8000, () => {
  console.log("koa服务启动成功🚀")
})
