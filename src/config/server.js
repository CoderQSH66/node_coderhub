// 导入dotenv
const dotenv = require("dotenv")

// 读取环境变量到process.env
dotenv.config()

// 导出配置
module.exports = { SEVER_PORT } = process.env
