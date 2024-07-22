const Router = require("@koa/router")
const UserController = require("../controller/user.controller")
const {
  veifyRgister,
  cryptoPassword
} = require("../middleware/user.middleware")

// 创建路由对象
const router = new Router({ prefix: "/user" })

//注册用户
router.post(
  "/register",
  veifyRgister,
  cryptoPassword,
  UserController.registerMiddleware
)

// 获取用户头像
router.get("/:id/avatar", UserController.getAvatar)

module.exports = router
