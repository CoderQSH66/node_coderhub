const Koa = require("koa")
const { koaBody } = require("koa-body")
const registerRouter = require("../utils/registerRouter")
const path = require("path")

// 创建app应用程序
const app = new Koa()

// 使用body处理中间件
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.resolve(__dirname, "../public/uploads"),
      keepExtensions: true,
      multiples: true
    },
    onError: (err) => {
      console.log(err)
    }
  })
)

// 使用路由中间件
registerRouter(app)

module.exports = app
