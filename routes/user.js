const Router = require("express-promise-router")
const db = require("../db")
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
// export our router to be mounted by the parent application
module.exports = router
router.get("/profile/:username", (req, res) => {
    const { username } = req.params
    const row = db.query("SELECT * FROM users WHERE username = $1", [username])
    res.render("profile", { username: username })
})

router.route("/register")
    .get((req, res) => {
        res.render("register")
    })

router.route("/login")
    .get((req, res) => {
        res.render("login")

    })
