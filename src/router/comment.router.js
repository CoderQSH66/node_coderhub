const Router = require("@koa/router")
const { verifyToken } = require("../middleware/login.middleware")
const CommentController = require("../controller/comment.controller")
const { verifyPermission } = require("../middleware/moment.middleware")

// 创建router对象
const router = new Router({ prefix: "/comment" })

// 添加路由映射关系
// 创建评论
router.post("/create", verifyToken, CommentController.createComment)

// 删除评论
router.delete("/delete/:commentId", verifyToken, verifyPermission, CommentController.deleteComment)
module.exports = router
