const router = require("express").Router()

router.use("/user", require("./users"))

router.use("/", require("./default"))

router.use("/tweets", require("./tweets"))

router.use("/f", require("./relations"))

router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message

        return errors
      }, {})
    })
  }

  return next(err)
})

module.exports = router