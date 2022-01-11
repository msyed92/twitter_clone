const router = require("express").Router()
const { register } = require("./functions/user/register")
const { login } = require("./functions/user/login")
const api = require("./functions/api")
const passport = require("passport")

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
router.route("/user")
    .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
        api.getUser("id", req.payload.id).then(function (user) {
            if (!user) { return res.sendStatus(401); }

            return res.json({ user: user.toAuthJSON() });
        }).catch(next);
    })

router.route("/profile/:username")
    .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
        //GET user profile
    })

// export our router to be mounted by the parent application
module.exports = router