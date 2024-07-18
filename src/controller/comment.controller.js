const CommentService = require("../service/comment.service")
const { DATABASE_OPERATE_ERROR } = require("../config/error-cont")

class CommentController {
  async createComment(ctx, next) {
    try {
      const { momentId, content, commentId = null } = ctx.request.body
      const { id: userId } = ctx.decoded
      const body = { momentId, content, userId, commentId }
      const reslut = await CommentService.insertComment(body)
      ctx.body = {
        code: 200,
        msg: commentId ? "回复成功" : "评论成功",
        data: reslut
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit("error", DATABASE_OPERATE_ERROR, ctx)
    }
  }
}

module.exports = new CommentController()
