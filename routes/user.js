const Router = require("express-promise-router")
const db = require("../db")
const utils = require('../lib/utils')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

router.get("/profile/:username", (req, res) => {
    const { username } = req.params
    const row = db.query("SELECT * FROM users WHERE username = $1", [username])
    res.render("profile", { username: username })
})

router.route("/register")
    .get((req, res) => {
        res.render("register")
    })
    .post((req, res, next) => {
        const saltHash = utils.genPassword(req.body.password)

        const salt = saltHash.salt
        const hash = saltHash.hash

        const query = 'INSERT INTO users(username, email_num, hash, salt, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *'
        const values = [req.body.username, [req.body.token], hash, salt, new Date(Date.now()).toISOString()]

        db.query(query, values)
            .then((user) => {
                console.log(user.fields[0].tableID)
                const jwt = utils.issueJWT(user)
                res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires })
            })
            .catch((err) => next(err))
    })

router.route("/login")
    .get((req, res) => {
        res.render("login")

    })

// export our router to be mounted by the parent application
module.exports = router
