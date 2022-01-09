const db = require("../config/database")
const router = require("express").Router()

module.exports = router
router.route("/")
    .get(async (req, res) => {
        //render sign in/signup page
    })