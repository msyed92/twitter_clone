const db = require("../config/database")
const utils = require("../lib/utils")
const router = require("express").Router()

router.route("/login")
    .get((req, res, next) => {
    })
    .post((req, response, next) => {

    })

router.route("/register")
    .get((req, res) => {
    })
    .post((req, response, next) => {

    })

/***********User can only enter these routes if authenticated/logged in ***********/
router.route("/home")
    .get((req, res, next) => {
    })


router.route("/profile/:username")
    .get((req, res, next) => {

    })




// export our router to be mounted by the parent application
module.exports = router



