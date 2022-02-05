const router = require("express").Router()
const { submit, getUser, getTL, getWhoToFollow, edit, del } = require("./functions/tweet")
const passport = require("passport")

router.route("/submit")
    .post(passport.authenticate('jwt', { session: false }), submit)

router.route("/:username")
    .get(passport.authenticate('jwt', { session: false }), getUser)

router.route("/home/timeline")
    .get(passport.authenticate('jwt', { session: false }), getTL)

router.route("/home/whotofollow")
    .get(passport.authenticate('jwt', { session: false }), getWhoToFollow)

router.route("/edit")
    .post(passport.authenticate('jwt', { session: false }), edit)

router.route("/delete")
    .post(passport.authenticate('jwt', { session: false }), del)


module.exports = router
