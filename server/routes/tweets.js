const router = require("express").Router()
const auth = require("./functions/auth")
const tweet = require("./functions/tweet")

router.route("/submit")
    .post(auth, tweet.submit)

router.route("/:username")
    .get(auth, tweet.getUser)

router.route("/timeline")
    .get(auth, tweet.getTL)

module.exports = router
