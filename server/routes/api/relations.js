const router = require("express").Router()
const { like, retweet, follow } = require("./functions/relation")
const passport = require('passport')

router.route("/follow")
    .post(passport.authenticate('jwt', { session: false }), follow)

router.route("/like")
    .post(passport.authenticate('jwt', { session: false }), like)

router.route("/retweet")
    .post(passport.authenticate('jwt', { session: false }), retweet)

module.exports = router
