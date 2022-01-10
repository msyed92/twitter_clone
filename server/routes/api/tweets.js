const router = require("express").Router()
const auth = require("../auth")
const tweet = require("./functions/tweet")

router.route("/submit")
    .post(auth.checkAuthentication, tweet.submit)

router.route("/:username")
    .get(auth.checkAuthentication, tweet.getUser)

router.route("/timeline")
    .get(auth.checkAuthentication, tweet.getTL)

module.exports = router
