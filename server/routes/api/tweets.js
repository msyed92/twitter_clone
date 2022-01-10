const router = require("express").Router()
const auth = require("../auth")
const tweet = require("./functions/tweet")

router.route("/submit")
    .post(auth.required, tweet.submit)

router.route("/:username")
    .get(auth.required, tweet.getUser)

router.route("/timeline")
    .get(auth.required, tweet.getTL)

module.exports = router
