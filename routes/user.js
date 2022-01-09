const router = require("express").Router()
const auth = require("./functions/auth")
const { register } = require("./functions/register")
const { login } = require("./functions/login")

router.route("/login")
    .get((req, res, next) => {
        //render login page
    })
    .post(login)

router.route("/register")
    .get((req, res) => {
        //render register page
    })
    .post(register)

/***********User can only enter these routes if authenticated/logged in ***********/
router.route("/home")
    .get(auth, (req, res, next) => {
    })

router.route("/profile/:username")
    .get(auth, (req, res, next) => {
        //GET user profile
    })

// export our router to be mounted by the parent application
module.exports = router