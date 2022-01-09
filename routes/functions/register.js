const client = require("../../config/database").client
const pool = require("../../config/database").pool
const jwt = require("jsonwebtoken")
const api = require("./api.js")
const utils = require("../../lib/password")
require("dotenv").config()

//Registration Function

exports.register = (req, response) => {
    const { username, password, email, phone, firstName, lastName } = req.body
    let flag = false
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
                    username,
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
                        flag = true
                        response.status(200).send({ message: 'User added to database, not verified' })
                        return res
                    })
                    .catch((err) => {
                        flag = false //If user is not inserted is not inserted to database assigning flag as 0/false.
                        console.error(err)
                        return response.status(500).json({
                            error: "Database error"
                        })
                    })

                if (flag) {
                    const token = jwt.sign({ email: email }, process.env.SECRET_KEY)
                }
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




