// ./routes/index.js
const router = require("express").Router()

router.use("/user", require("./users"))

router.use("/", require("./default"))

router.use("/tweets", require("./tweets"))

router.use("/f", require("./relations"))


module.exports = router