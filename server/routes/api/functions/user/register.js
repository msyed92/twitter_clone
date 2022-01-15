const pool = require("../../../../config/database").pool
const jwt = require("jsonwebtoken")
const api = require("../api.js")
const utils = require("../password")
const auth = require("../../../auth")
require("dotenv").config({ path: "../../../../../.env" })

//Registration Function

exports.register = async (req, response, next) => {
    const { username, password, email, phone, firstName, lastName } = req.body
    try {
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
                .then(async (result) => {
                    const db_user = result.rows[0]
                    return db_user
                })
                .then(async (db_user) => {
                    const SQL = "INSERT INTO relationships (follower_id, followed_id, created_at) VALUES ($1, $2, $3) RETURNING *"
                    const values = [db_user.id, db_user.id, new Date(Date.now()).toISOString()]
                    await pool.query(SQL, values)
                    return db_user

                })
                .then((user) => {
                    const tokenObject = auth.issueJWT(user);
                    return response.cookie('jwt', tokenObject.token,
                        {
                            httpOnly: true,
                            secure: false //--> SET TO TRUE ON PRODUCTION
                        }
                    ).status(200).json({ success: true, expiresIn: tokenObject.expires, msg: "successfully registered" });
                })
                .catch(next)

        }

    }
    catch (err) {
        console.log(err)
        response.status(500).json({
            error: "Database error while registring user!", //Database connection error
        })
    }
}