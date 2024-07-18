const app = require("./app")
const { SEVER_PORT } = require("./config/server")
require("./utils/handle-error")

// 监听启动服务
app.listen(SEVER_PORT, () => {
  console.log("koa服务启动成功🚀")
})
