// ./routes/index.js
const router = require("express").Router()

router.use("/user", require("./user"))

router.use("/", require("./default"))

router.use("/tweets", require("./tweets"))

module.exports = router