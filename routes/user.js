const db = require("../db")
const utils = require("../lib/utils")
const passport = require("passport")
require("passport-jwt")
const router = require("express").Router()

router.route("/profile/:username")
    .get((req, res, next) => {

    })

router.route("/home")
    .get((req, res, next) => {
        res.render("home", { username: "CHANGE THIS" })


    })

router.route("/register")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.redirect("/home")
        } else {
            res.render("register")
        }
    })
    .post((req, response, next) => {

    })

router.route("/login")
    .get((req, res) => {
        res.render("login")
    })


// export our router to be mounted by the parent application
module.exports = router



