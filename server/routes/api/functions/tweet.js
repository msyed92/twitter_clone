const pool = require("../../../config/database").pool
const jwt = require("jsonwebtoken")
const api = require("./api.js")

//Login Function
exports.submit = async (req, res) => {
    try {
        const newLocal = await api.getUser(follower).then((u) => { return u.rows[0] }).catch((err) => { throw err })
        const user = newLocal
        const query = "INSERT INTO tweets (content, created_at, user_id) VALUES ($1, $2, $3)"
        const values = [req.body.content, new Date(Date.now()).toISOString(), req.body.user_id]
        pool.query(query, values)
            .then((result) => {
                response.status(200).json({ message: `Tweet submitted by`, user: user.toAuthJSON(), id: follower })
                return result
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
        const user = await api.getUser("username", username.toLowerCase())

        const id = user.rows[0].id
        const result = await api.getTweets(id)
        const token = jwt.sign({ id: user_id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        return res.status(200).json({ message: "User tweets found", token: token, tweets: result })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Database error occurred while finding user!", //Database connection error
        })
    }
}