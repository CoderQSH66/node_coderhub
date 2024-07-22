const CommentService = require("../service/comment.service")
const { DATABASE_OPERATE_ERROR } = require("../config/error-cont")

class CommentController {
  /** 添加评论路由 */
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
  /** 删除评论路由 */
  async deleteComment(ctx, next) {
    try {
      const { commentId } = ctx.params
      const reslut = await CommentService.deleteComment(commentId)
      ctx.body = {
        code: 200,
        msg: "删除成功",
        data: reslut
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit("error", DATABASE_OPERATE_ERROR, ctx)
    }
  }
}

module.exports = new CommentController()
