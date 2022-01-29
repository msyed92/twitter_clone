const router = require("express").Router()
const { register } = require("./functions/user/register")
const { login, logout } = require("./functions/user/login")
const { protected, profile } = require("./functions/user/protected")
const passport = require("passport")
const api = require("../api/functions/api")

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

router.route("/info")
    .post(passport.authenticate('jwt', { session: false }), async (req, res, next) => {
        let status;
        let user;
        await api.getUser("id", req.body.id).then((r) => {
            const u = r.rows[0]
            user = { username: u.username, id: u.id, name: u.first_name }
            status = 200
        }).catch((e) => {
            user = { user: "error getting user" }
            status = 400
        })
        return res.status(status).json(user)
    })

// export our router to be mounted by the parent application
module.exports = router