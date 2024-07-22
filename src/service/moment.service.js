const pool = require("../app/detabase")
class MomentService {
  /**
   * @description 插入动态评论
   * @param {obj} body
   * @returns Promise
   */
  async insertMoment(body) {
    const { content, user_id } = body
    const statement = `INSERT INTO moment(content, user_id) VALUES(?, ?)`
    const [result] = await pool.execute(statement, [content, user_id])
    return result
  }

  /**
   *@description 查询动态列表
   * @param {string} offset
   * @param {string} limit
   * @returns Promise
   */
  async queryMoment(offset, limit) {
    let statement = `
                  SELECT m.id,m.content,m.createAt,m.updateAt, 
                  JSON_OBJECT("id", u.id, "name", u.name, "telphone", u.telphone, "avatar", u.avatar_url) AS user_info,
                  (SELECT COUNT(*) FROM comment WHERE moment_id = m.id) As total,
                  (SELECT COUNT(*) FROM moment_label WHERE moment_id = m.id) As labelCount
                  FROM moment As m LEFT JOIN user AS u
                  ON u.id = m.user_id
                  `
    let result = []
    if (!offset && !limit) {
      const [resluts] = await pool.execute(statement)
      result = resluts
    } else {
      statement += ` LIMIT ?, ?`
      const [resluts] = await pool.execute(statement, [
        String(offset),
        String(limit)
      ])
      result = resluts
    }
    return result
  }

  /**
   * @description 查询动态详情
   * @param {String} moment_id
   * @returns Promise
   */
  async queryMomentDetail(moment_id) {
    const statement = `
                      SELECT m.id,m.content, m.createAt,m.updateAt,
                      JSON_OBJECT("userId", u.id, "name", u.name, "telphone", u.telphone, "avatar", u.avatar_url) AS user_info,
                      JSON_OBJECT("commentId", c.id, "content", c.content, "child",
                      (SELECT JSON_ARRAYAGG(JSON_OBJECT('commentId', id, "content", content)) FROM comment
                      WHERE comment_id = c.id
                      GROUP BY comment_id 
                      )) AS comment_info,
                      (SELECT COUNT(*) FROM moment_label WHERE moment_id = m.id) As labelCount
                      FROM moment As m LEFT JOIN user AS u 
                      ON m.user_id = u.id 
                      LEFT JOIN comment AS c
                      ON m.id = c.moment_id
                      GROUP BY m.id
                      HAVING m.id = ?
                      `
    const [result] = await pool.execute(statement, [String(moment_id)])
    return result
  }

  /**
   * @description 更新动态
   * @param {String} content
   * @param {String} id
   * @returns Promise
   */
  async updateMoment(content, id) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`
    const [result] = await pool.execute(statement, [content, id])
    return result
  }

  /**
   * @description 删除动态
   * @param {String} id
   * @returns
   */
  async deleteMoment(id) {
    const statement = `DELETE FROM moment WHERE id = ?`
    const [result] = await pool.execute(statement, [id])
    return result
  }
}
module.exports = new MomentService()
