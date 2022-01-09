const pool = require("../config/database")
const router = require("express").Router()

const { register } = require("./functions/register")
const { login } = require("./functions/login")

router.route("/login")
    .get((req, res, next) => {
        //render login page
    })
    .post((req, res) => { })

router.route("/register")
    .get((req, res) => {
        //render register page
    })
    .post(register)

/***********User can only enter these routes if authenticated/logged in ***********/
router.route("/home")
    .get((req, res, next) => {
        //GET tweets, access settings, render user specific information
    })


router.route("/profile/:username")
    .get((req, res, next) => {
        //GET user profile
    })


// export our router to be mounted by the parent application
module.exports = router



