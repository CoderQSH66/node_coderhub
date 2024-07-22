const LabelService = require("../service/label.service")
const { DATABASE_OPERATE_ERROR } = require("../config/error-cont")

class LabelController {
  /** 创建标签 */
  async createLable(ctx, next) {
    try {
      const { labelname } = ctx.request.body
      const result = await LabelService.createLabel(labelname)
      ctx.body = {
        code: 200,
        msg: "添加成功",
        data: result
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit("error", DATABASE_OPERATE_ERROR, ctx)
    }
  }
  /** 为动态添加标签 */
  async addlabels(ctx, next) {
    try {
      const { momentId } = ctx.params
      const labels = ctx.labels
      for (const label of labels) {
        const isChecked = await LabelService.isChecked(momentId, label.id)
        if (isChecked) {
          continue
        } else {
          // 添加至数据库
        }
      }
    } catch (error) {}
  }
}

module.exports = new LabelController()
