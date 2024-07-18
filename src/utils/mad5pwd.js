const crypto = require("crypto")
const mad5pwd = (password) => {
  // 1、创建md5对象
  const md5 = crypto.createHash("md5")

  // 2、md5加密
  const md5password = md5.update(password)

  // 3、返回加密后的密码
  const newPassword = md5password.digest("hex")

  return newPassword
}

module.exports = mad5pwd
