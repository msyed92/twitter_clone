const router = require("express").Router()
const { register } = require("./functions/user/register")
const { login, logout } = require("./functions/user/login")
const api = require("./functions/api")
const passport = require("passport")

router.route("/login")
    .post(login)

router.route("/logout")
    .post(logout)

router.route("/register")
    .get((req, res) => {
        //render register page
    })
    .post(register)

/***********User can only enter these routes if authenticated/logged in ***********/
router.route("/protected")
    .get(passport.authenticate('jwt', { session: false }), async (req, res, next) => {
        await api.getUser("id", req.payload.id).then(function (user) {
            if (!user) { return res.sendStatus(401); }

            return res.json({ success: true, message: "you have enetered the protected route!" });
        }).catch(next);
    })

router.route("/profile/:username")
    .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
        api.getUser("id", req.payload.id).then(function (user) {
            if (!user) { return res.sendStatus(401); }

            return res.json({ success: true, message: "you have enetered the protected route!" });
        }).catch(next);
    })

// export our router to be mounted by the parent application
module.exports = router