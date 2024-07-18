const Router = require("@koa/router")
const { verifyToken } = require("../middleware/login.middleware")
const CommentController = require("../controller/comment.controller")
// 创建router对象
const router = new Router({ prefix: "/comment" })

router.post("/create", verifyToken, CommentController.createComment)

module.exports = router
