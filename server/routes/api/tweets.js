const router = require("express").Router()
const { submit, getUser, getTL } = require("./functions/tweet")
const passport = require("passport")

router.route("/submit")
    .post(passport.authenticate('jwt', { session: false }), submit)

router.route("/:username")
    .get(passport.authenticate('jwt', { session: false }), getUser)

router.route("/home/timeline")
    .get(passport.authenticate('jwt', { session: false }), getTL)

module.exports = router
