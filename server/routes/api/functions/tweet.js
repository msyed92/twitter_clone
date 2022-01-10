const pool = require("../../../config/database").pool
const jwt = require("jsonwebtoken")
const api = require("./api.js")
const auth = require("../../auth")

//Login Function
exports.submit = async (req, response) => {
    try {
        const id = req.headers.id
        const content = req.body.content
        const newLocal = await api.getUser("id", id).then((u) => { return u.rows[0] }).catch((err) => { throw err })
        const db_user = newLocal
        const query = "INSERT INTO tweets (content, created_at, user_id) VALUES ($1, $2, $3) RETURNING *"
        const values = [content, new Date(Date.now()).toISOString(), db_user.id]
        pool.query(query, values)
            .then(async (result) => {
                const tweet = result.rows[0]
                console.log(tweet)
                response.status(200).json({ message: `Tweet submitted by`, user: await auth.toAuthJSON(db_user), tweet: content })
                return tweet
            })
            .catch((err) => {
                console.error(err)
                return response.status(500).json({
                    error: "Error submitting tweet."
                })
            })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Database error while submitting tweet!", //Database connection error
        })

    }
}

exports.getTL = async (req, res) => {
    const { id } = req.body.id
    try {
        const follows = await api.getFollowed(id)
    } catch (err) {
    }
}

exports.getUser = async (req, res) => {
    const { username } = req.params
    const { user_id } = req.body.id

    try {
        const user = await api.getUser("username", username.toLowerCase()).then((u) => { return u.rows[0] }).catch((err) => { throw err })
        const id = user.id
        const result = await api.getTweets(id)
        return res.status(200).json({ message: "User tweets found", user: await auth.toAuthJSON(user), id: id, tweets: result })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Database error occurred while finding user!", //Database connection error
        })
    }
}