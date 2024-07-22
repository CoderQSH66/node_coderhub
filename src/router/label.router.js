const Router = require("@koa/router")
const { verifyToken } = require("../middleware/login.middleware")
const LabelController = require("../controller/label.controller")
// 创建路由对象
const router = new Router({ prefix: "/label" })

// 添加路由映射关系
// 添加标签
router.post("/", verifyToken, LabelController.createLable)

module.exports = router
