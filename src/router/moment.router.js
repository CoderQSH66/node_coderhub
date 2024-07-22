const Router = require("@koa/router")
const { verifyToken } = require("../middleware/login.middleware")
const { verifyPermission } = require("../middleware/moment.middleware")
const { verifyLabelIsExist } = require("../middleware/label.middleware")
const MomentController = require("../controller/moment.controller")
const LabelController = require("../controller/label.controller")
const router = new Router({ prefix: "/moment" })

// 添加路由映射关系

// 创建动态
router.post("/create", verifyToken, MomentController.create)
// 获取动态列表
router.get("/", MomentController.query)
// 获取动态详情
router.get("/:id", MomentController.queryDetail)
// 修改动态
router.patch("/update/:momentId", verifyToken, verifyPermission, MomentController.updateMoment)
// 删除动态
router.delete("/delete/:momentId", verifyToken, verifyPermission, MomentController.deleteMoment)
// 动态-添加标签
router.post("/:momentId/labels", verifyToken, verifyPermission, verifyLabelIsExist, LabelController.addlabels)
module.exports = router
