const router = require("express").Router()
const auth = require("./functions/auth")
const relation = require("./functions/relation")

router.route("/follow")
    .post(auth, relation.follow)

router.route("/unfollow")
    .post(auth, relation.unfollow)

module.exports = router
