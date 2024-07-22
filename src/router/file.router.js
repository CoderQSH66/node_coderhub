const Router = require("@koa/router")
const { verifyToken } = require("../middleware/login.middleware")
const FileController = require("../controller/file.controller")
const fileController = require("../controller/file.controller")
const router = new Router({ prefix: "/upload" })

// 头像上传
router.post("/", verifyToken, fileController.uploadAvatar)
module.exports = router
