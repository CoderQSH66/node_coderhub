const { DATABASE_OPERATE_ERROR, NOT_UPDATE_PERMISSION } = require("../config/error-cont")
const PermissionService = require("../service/permission.service")

/** 通用权限验证 */
const verifyPermission = async (ctx, next) => {
  try {
    const { id: userId } = ctx.decoded
    const key = Object.keys(ctx.params)[0]
    const resouseId = ctx.params[key]
    const resouseNmae = Object.keys(ctx.params)[0].replace("Id", "")
    const result = await PermissionService.checkPermission(resouseNmae, resouseId, userId)
    if (result.length === 0) {
      return ctx.app.emit("error", NOT_UPDATE_PERMISSION, ctx)
    }
    await next()
  } catch (error) {
    console.log(error)
    ctx.app.emit("error", DATABASE_OPERATE_ERROR, ctx)
  }
}

module.exports = {
  verifyPermission
}
