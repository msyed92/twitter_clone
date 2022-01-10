const router = require("express").Router()

router.route("/")
    .get(async (req, res) => {
        //render sign in/signup page
        res.send("HOMEPAGE NO AUTH")
    })

module.exports = router
