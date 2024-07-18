const Koa = require("koa")
const Router = require("@koa/router")
const jwt = require("jsonwebtoken")

// 创建app应用程序
const app = new Koa()
// 创建router对象
const router = new Router({ prefix: "/login" })

const secretKey = "some secret hurr"
// 注册router中间件
router.get("/", (ctx, next) => {
  // 1、登录成功，服务器颁发token
  const payload = {
    name: "coderqsh",
    phone: "15212312311",
    password: "123456"
  }
  const token = jwt.sign(payload, secretKey, { expiresIn: 60 })
  ctx.body = {
    code: 200,
    msg: "登录成功",
    data: {
      token
    }
  }
})
router.get("/info", (ctx, next) => {
  // 2、后续请求携带token
  const token = ctx.headers.authorization.replace("Bearer ", "")
  // 3、验证token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      ctx.body = {
        code: 401,
        msg: "token过期或无效~"
      }
    } else {
      ctx.body = {
        code: 200,
        msg: "success",
        data: decoded
      }
    }
  })
})

// app中添加路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 监听启动服务
app.listen(8000, () => {
  console.log("koa服务启动成功🚀")
})
