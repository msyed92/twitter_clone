const router = require("express").Router()
const auth = require("../auth")
const tweet = require("./functions/tweet")
const passport = require("passport")

router.route("/submit")
    .post(passport.authenticate('jwt', { session: false }), tweet.submit)

router.route("/:username")
    .get(passport.authenticate('jwt', { session: false }), tweet.getUser)

router.route("/home/timeline")
    .get(passport.authenticate('jwt', { session: false }), tweet.getTL)

module.exports = router
