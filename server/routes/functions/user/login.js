const pool = require("../../../config/database").pool
const jwt = require("jsonwebtoken")
const utils = require("../../../lib/password")
const api = require("../api.js")

//Login Function
exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const data = await api.getUser("username", username.toLowerCase()) //Verifying if the user exists in the database
        const user = data.rows[0]
        if (user.length === 0) {
            res.status(400).json({
                error: "User is not registered, Sign Up first",
            })
        }
        else {
            const isValid = utils.validPassword(password, user.hash, user.salt)
            if (isValid) {
                const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1d' })
                res.status(200).json({
                    message: "User signed in!",
                    token: token,
                    id: user.id
                })

            } else {
                res.status(400).json({
                    error: "Enter correct password!",
                })
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        })
    }
}