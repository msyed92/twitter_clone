// ./routes/index.js
const user = require("./user")
const default_ = require("./default")

module.exports = (app) => {
    app.use("/user", user)
    app.use("/", default_)
}