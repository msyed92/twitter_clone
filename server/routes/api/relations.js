const router = require("express").Router()
const auth = require("../auth")
const relation = require("./functions/relation")

router.route("/follow")
    .post(auth.auth.required, relation.follow)

router.route("/unfollow")
    .post(auth.auth.required, relation.unfollow)

module.exports = router
