const pool = require("../../../../config/database").pool
const passport = require('passport')
const jwt = require("jsonwebtoken")
const utils = require("../password")
const api = require("../api.js")
const auth = require('../../../auth');

//Login Function
exports.login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await api.getUser("username", username).then((result) => { return result.rows[0] }).catch((err) => { next(err) })
        let message = ''
        if (!user) {
            message = "could not find user"
            return res.status(401).json({ success: false, msg: message });
        }

        // Function defined at bottom of app.js
        const isValid = utils.validPassword(password, user.hash, user.salt);

        if (isValid) {
            const tokenObject = auth.issueJWT(user);
            message = "succesfully logged in"
            return res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, msg: message });
        } else {
            message = "you entered the wrong password"
            return res.status(401).json({ success: false, msg: message });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        })
    }
}