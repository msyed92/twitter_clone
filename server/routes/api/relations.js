const router = require("express").Router()
const relation = require("./functions/relation")
const passport = require('passport')

router.route("/follow")
    .post(passport.authenticate('jwt', { session: false }), relation.follow)

router.route("/unfollow")
    .post(passport.authenticate('jwt', { session: false }), relation.unfollow)

module.exports = router
