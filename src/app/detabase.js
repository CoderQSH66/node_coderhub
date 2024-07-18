const mysql2 = require("mysql2")

// 创建数据库连接池
const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "coderhub",
  connectionLimit: 5
})

// 连接测试
pool.getConnection((err, conn) => {
  if (err) {
    throw err
  }
  conn.connect((err) => {
    if (err) {
      console.log(`数据库连接失败`, err)
    } else {
      console.log("数据库连接成功👁️")
    }
  })
  // 释放连接
  conn.release()
})

// 返回Promise连接池对象
module.exports = pool.promise()
