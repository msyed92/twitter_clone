const pool = require("../../../../config/database").pool
const jwt = require("jsonwebtoken")
const api = require("../api.js")
const utils = require("../password")
require("dotenv").config()

//Registration Function

exports.register = (req, response, next) => {
    const { username, password, email, phone, firstName, lastName } = req.body
    try {
        (async () => {
            const checkEmail = await api.getUser("email", email)
            const checkUsername = await api.getUser("username", username)

            if (checkEmail.rows.length > 0) {
                return response.status(400).json({
                    error: `Email ${email} already exists, No need to register again.`,
                })
            }
            if (checkUsername.rows.length > 0) {
                return response.status(400).json({
                    error: `Username ${username} is taken.`,
                })
            }
            else {
                const saltHash = utils.genPassword(password)

                const user = {
                    username: username.toLowerCase(),
                    email,
                    phone,
                    firstName,
                    lastName,
                    hash: saltHash.hash,
                    salt: saltHash.salt,
                    time: new Date(Date.now()).toISOString()
                }
                await api.registerUser(user)
                    .then(function () {
                        response.json({ user: user.toAuthJSON() });
                        return res
                    }).catch(next);
            }
        })()

    }
    catch (err) {
        console.log(err)
        response.status(500).json({
            error: "Database error while registring user!", //Database connection error
        })
    }
}