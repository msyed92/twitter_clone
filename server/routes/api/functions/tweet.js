const pool = require("../../../config/database").pool
const api = require("./api.js")

//submit a new tweet
exports.submit = async (req, response, next) => {
    try {
        const id = req.body.id
        const content = req.body.content

        const newLocal = await api.getUser("id", id).then((u) => { return u.rows[0] }).catch((err) => { throw err })
        const db_user = newLocal

        const query = "INSERT INTO tweets (content, created_at, user_id) VALUES ($1, $2, $3) RETURNING *"
        const values = [content, new Date(Date.now()).toISOString(), db_user.id]
        pool.query(query, values)
            .then((result) => {
                const tweet = result.rows[0]
                return response.status(200).json({ success: true, message: `Tweet submitted!`, user: db_user.username, tweet: content })
            })
            .catch((err) => {
                console.error(err)
                return response.status(500).json({
                    success: false,
                    error: "Error submitting tweet."
                })
            })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Database error while submitting tweet!", //Database connection error
        })

    }
}

exports.getTL = async (req, response, next) => {

    try {
        const id = req.user.id
        const local = await api.getFollowed(id).then((f) => { return f.rows }).catch((err) => { throw err })
        const follows = local

        const local_ = await Promise.all(follows.map(async (p) => {
            const t = await api.getTweets(p.followed_id)
            return t
        }))
        let tweets = local_.flat()
        tweets.sort((a, b) => a.updated_at - b.updated_at);
        return response.status(200).json({ message: "Timeline tweets found", id: id, tweets: tweets })
    } catch (err) {
        next()
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.user.id
        const { username } = req.params
        const local = await api.getUser("username", username.toLowerCase()).then((u) => { return u.rows[0] }).catch((err) => { throw err })
        if (local) {
            const profile = local
            const local_ = await api.getTweets(profile.id).then((t) => { return t.rows }).catch((err) => { throw err })
            const tweets = local_
            return res.status(200).json({ success: true, message: "User tweets found", profile: profile.id, id: id, tweets: tweets })
        } else {
            return res.status(200).json({ success: true, message: "User does not exist", id: id })
        }


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Database error occurred while finding user!", //Database connection error
        })
    }
}