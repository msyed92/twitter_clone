const client = require("../../../config/database").client
const pool = require("../../../config/database").pool
const jwt = require("jsonwebtoken")
const api = require("../api.js")
const utils = require("../../../lib/password")
require("dotenv").config()

//Registration Function

exports.register = (req, response) => {
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
                    .then((res) => {
                        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1d' })
                        response.status(200).send({ message: 'User added to database.', token: token })
                        return res
                    })
                    .catch((err) => {
                        console.error(err)
                        return response.status(500).json({
                            error: "Database error"
                        })
                    })
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