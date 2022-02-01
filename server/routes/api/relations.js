const router = require("express").Router()
const { like, retweet, follow, getInteractions, doesFollow } = require("./functions/relation")
const passport = require('passport')

router.route("/follow")
    .post(passport.authenticate('jwt', { session: false }), follow)

router.route("/like")
    .post(passport.authenticate('jwt', { session: false }), like)

router.route("/retweet")
    .post(passport.authenticate('jwt', { session: false }), retweet)

router.route("/interactions")
    .post(passport.authenticate('jwt', { session: false }), getInteractions)

router.route("/doesfollow")
    .post(passport.authenticate('jwt', { session: false }), doesFollow)

module.exports = router
