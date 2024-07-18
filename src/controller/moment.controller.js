const MomentService = require("../service/moment.service")
const { DATABASE_OPERATE_ERROR } = require("../config/error-cont")
class MomentController {
  /** 中间件-添加用户评论 */
  async create(ctx, next) {
    try {
      const body = Object.assign(ctx.request.body, { user_id: ctx.decoded.id })
      const res = await MomentService.insertMoment(body)
      ctx.body = {
        code: 200,
        msg: "动态发布成功",
        data: res
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit("error", DATABASE_OPERATE_ERROR, ctx)
    }
  }

  /** 中间件-获取动态列表 */
  async query(ctx, next) {
    try {
      const { offset, limit } = ctx.query
      const reslut = await MomentService.queryMoment(offset, limit)
      ctx.body = {
        code: 200,
        msg: "获取动态列表成功",
        data: reslut
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit("error", DATABASE_OPERATE_ERROR, ctx)
    }
  }

  /** 中间件-获取动态详情 */
  async queryDetail(ctx, next) {
    try {
      const { id: moment_id } = ctx.params
      const reslut = await MomentService.queryMomentDetail(moment_id)
      ctx.body = {
        code: 200,
        msg: "获取动态详情成功",
        data: reslut
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit("error", DATABASE_OPERATE_ERROR, ctx)
    }
  }
  /** 中间件-修改动态详情 */
  async updateMoment(ctx, next) {
    try {
      const { content } = ctx.request.body
      const { momentId } = ctx.params
      const res = await MomentService.updateMoment(content, momentId)
      ctx.body = {
        code: 200,
        msg: "修改动态成功",
        data: res
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit("error", DATABASE_OPERATE_ERROR, ctx)
    }
  }
  /** 中间件-删除动态 */
  async deleteMoment(ctx, next) {
    try {
      const { momentId } = ctx.params
      const res = await MomentService.deleteMoment(momentId)
      ctx.body = {
        code: 200,
        msg: "删除动态成功",
        data: res
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit("error", DATABASE_OPERATE_ERROR, ctx)
    }
  }
}

module.exports = new MomentController()
