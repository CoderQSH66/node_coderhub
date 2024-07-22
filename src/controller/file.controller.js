const FileService = require("../service/file.service")
const { DATABASE_OPERATE_ERROR } = require("../config/error-cont")
const { SEVER_PORT, SEVER_HOST } = require("../config/server")
class FileController {
  async uploadAvatar(ctx, next) {
    try {
      const { newFilename, mimetype, size } = ctx.request.files["avatar"]
      const { id } = ctx.decoded
      await FileService.uploadAvatar(id, newFilename, mimetype, size)
      const avatar_url = `${SEVER_HOST}:${SEVER_PORT}/user/${id}/avatar`
      await FileService.insertAvatar(avatar_url, id)
      ctx.body = {
        code: 200,
        msg: "上传成功",
        data: ctx.request.files["avatar"]
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit("error", DATABASE_OPERATE_ERROR, ctx)
    }
  }
}

module.exports = new FileController()
