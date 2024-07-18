const Koa = require("koa")
const Router = require("@koa/router")

// 创建app应用程序
const app = new Koa()
// 创建router对象
const router = new Router({ prefix: "/login" })

// 注册router中间件
router.get("/", (ctx, next) => {
  // 1、用户登录成功，服务器为客户端设置cookie
  ctx.cookies.set("username", "zhangsan", { maxAge: 60 * 1000 })
  ctx.type = "html"
  ctx.body = "<h2>登录成功</h2>"
})
router.get("/list", (ctx, next) => {
  // 2、后续请求会自动携带cookie信息
  const username = ctx.cookies.get("username")
  if (username === "zhangsan") {
    ctx.body = {
      code: 200,
      msg: "success",
      data: {
        username: "zhangsan",
        age: 16,
        height: 160
      }
    }
  } else {
    ctx.body = {
      code: 400,
      msg: "fail",
      data: null
    }
  }
})
// app中添加路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 监听启动服务
app.listen(8000, () => {
  console.log("koa服务启动成功🚀")
})
