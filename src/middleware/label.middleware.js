const LabelService = require("../service/label.service")
/**
 * @description 验证标签是否存在
 * @param {*} ctx
 * @param {*} next
 */
const verifyLabelIsExist = async (ctx, next) => {
  const { labels } = ctx.request.body
  const result = await LabelService.queryLabel()
  const newLabels = []
  for (const label of labels) {
    const _label = result.find((item) => {
      return item.name === label
    })
    if (_label) {
      newLabels.push(_label)
    } else {
      const _result = await LabelService.createLabel(label)
      newLabels.push({ id: _result.insertId, name: label })
    }
  }
  ctx.labels = newLabels
  await next()
}

module.exports = {
  verifyLabelIsExist
}
