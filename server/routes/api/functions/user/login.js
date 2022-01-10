const pool = require("../../../../config/database").pool
const jwt = require("jsonwebtoken")
const utils = require("../password")
const api = require("../api.js")
const auth = require('../../../auth');

//Login Function
exports.login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        if (!username) {
            return res.status(422).json({ errors: { email: "can't be blank" } });
        }

        if (!password) {
            return res.status(422).json({ errors: { password: "can't be blank" } });
        }

        passport.authenticate('local', { session: false }, function (err, user, info) {
            if (err) { return next(err); }

            if (user) {
                user.token = user.generateJWT();
                return res.json({ user: user.toAuthJSON() });
            } else {
                return res.status(422).json(info);
            }
        })(req, res, next);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        })
    }
}