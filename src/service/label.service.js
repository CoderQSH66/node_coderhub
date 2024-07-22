const pool = require("../app/detabase")

class LabelService {
  /**
   * @description 添加标签
   * @param {String} labelname
   * @returns
   */
  async createLabel(labelname) {
    const statement = "INSERT INTO label(name) VALUES(?)"
    const [results] = await pool.execute(statement, [labelname])
    return results
  }
  /**
   * @returns 查询所有标签
   * @returns Primise
   */
  async queryLabel() {
    const statement = "SELECT id, name FROM label"
    const [results] = await pool.execute(statement)
    return results
  }

  /**
   * @description 检查标签是否存在
   * @param {String | Number} labelId
   * @returns Boolean
   */
  async isChecked(momentId, labelId) {
    const statement =
      "SELECT * FROM moment_label WHERE moment_id = ? and label_id = ?"
    const [results] = await pool.execute(statement, [momentId, labelId])
    return !!results.length
  }
  async addLabelToMoment(momentId, labelId) {
    const statement =
      "INSERT INTO moment_label(moment_id, label_id) VALUES(?, ?)"
    const [results] = await pool.execute(statement, [momentId, labelId])
    return results
  }
}

module.exports = new LabelService()
