const db = require("../config/database")
const utils = require("../lib/utils")
const passport = require("passport")
require("passport-local")
const router = require("express").Router()

router.route("/profile/:username")
    .get((req, res, next) => {
        console.log(req.headers.cookie)

    })


router.route("/home")
    .get((req, res, next) => {
        console.log(req.isAuthenticated)
        if (req.isAuthenticated) {
            console.log("AUTHENTICATED")
        }
        //res.render("home", { username: "CHANGE THIS" })
    })

router.route("/login")
    .get((req, res, next) => {
        res.render("login")
    })
    .post((req, response, next) => {
        const query = "SELECT * FROM users WHERE username = $1"
        const values = [req.body.username]
        db.query(query, values)
            .then((res) => {
                const user = res.rows[0]
                if (!user) {
                    response.redirect("/home/login")
                }
                if (!utils.validPassword(req.body.password, user.hash, user.salt)) {

                    response.redirect("/home/login")
                }
                passport.authenticate("local", (req, res), () => {
                    response.redirect("/user/home")
                })
            })
            .catch((err) => {
                console.log(err)
                //res.redirect("/home/login")
            })

    })

router.route("/register")
    .get((req, res) => {
        res.render("register")
    })
    .post((req, response, next) => {
        const saltHash = utils.genPassword(req.body.password)
        const salt = saltHash.salt
        const hash = saltHash.hash

        const query = 'INSERT INTO users (username, email_num, hash, salt, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *'
        const values = [req.body.username, [req.body.token], hash, salt, new Date(Date.now()).toISOString()]

        db.query(query, values)
            .then((res) => {
                const user = res.rows[0]
                console.log(user)
                // const jwt = utils.issueJWT(user)
                // response.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires })

            })

    })


// export our router to be mounted by the parent application
module.exports = router



