const fs = require("fs")
const path = require("path")

const registerRouter = (app) => {
  const filePath = path.resolve(__dirname, "../router")
  fs.readdir(filePath, { withFileTypes: true, recursive: true }, (err, files) => {
    files.forEach((file) => {
      const router = require(`${filePath}/${file.name}`)
      if (file.name.endsWith(".router.js")) {
        app.use(router.routes())
        app.use(router.allowedMethods())
      }
    })
  })
}

module.exports = registerRouter
