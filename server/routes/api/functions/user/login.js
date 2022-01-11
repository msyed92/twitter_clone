const pool = require("../../../../config/database").pool
const passport = require('passport')
const jwt = require("jsonwebtoken")
const utils = require("../password")
const api = require("../api.js")
const auth = require('../../../auth');

//Login Function
exports.login = async (req, res, next) => {
    console.log(req)
    const { username, password } = req.body
    try {
        const user = await api.getUser("username", username).then((result) => { return result.rows[0] }).catch((err) => { next(err) })

        if (!user) {
            return res.status(401).json({ success: false, msg: "could not find user" });
        }

        // Function defined at bottom of app.js
        const isValid = utils.validPassword(password, user.hash, user.salt);

        if (isValid) {
            const tokenObject = auth.issueJWT(user);
            return res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
        } else {
            return res.status(401).json({ success: false, msg: "you entered the wrong password" });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        })
    }
}