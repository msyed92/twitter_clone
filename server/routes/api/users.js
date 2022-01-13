const router = require("express").Router()
const { register } = require("./functions/user/register")
const { login, logout } = require("./functions/user/login")
const { protected, profile } = require("./functions/user/protected")
const passport = require("passport")

router.route("/login")
    .post(login)

router.route("/logout")
    .post(logout)

router.route("/register")
    .post(register)

/***********User can only enter these routes if authenticated/logged in ***********/
router.route("/protected")
    .get(passport.authenticate('jwt', { session: false }), protected)

router.route("/profile/:username")
    .get(passport.authenticate('jwt', { session: false }), protected, profile)

// export our router to be mounted by the parent application
module.exports = router