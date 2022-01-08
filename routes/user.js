const db = require("../config/database")
const utils = require("../lib/utils")
const passport = require("passport")
require("passport-jwt")
const router = require("express").Router()

router.route("/profile/:username")
    .get((req, res, next) => {
        console.log(req.headers.cookie)

    })


router.route("/home")
    .get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
        res.render("home", { username: "CHANGE THIS" })
    })

router.route("/login")
    .get((req, res) => {
        res.render("login")
    })
    .post((req, response, next) => {
        const query = "SELECT * FROM users WHERE username = $1"
        const values = [req.body.username]
        db.query(query, values)
            .then((res) => {
                const user = res.rows[0]
                if (!user) {
                    response.status(401).json(({ success: false, msg: "could not find user" }))
                }

                const isValid = utils.validPassword(req.body.password, user.hash, user.salt)

                if (isValid) {
                    const jwt = utils.issueJWT(user)
                    //response.cookie('jwt', jwt.token, { httpOnly: true, secure: true, maxAge: 3600000 })
                    response.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires })
                } else {
                    response.status(401).json(({ success: false, msg: "incorrect password" }))
                }
            })
            .catch((err) => {
                next(err)
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
                const jwt = utils.issueJWT(user)
                response.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires })

            })

    })


// export our router to be mounted by the parent application
module.exports = router



