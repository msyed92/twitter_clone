const pool = require("../../config/database").pool
const jwt = require("jsonwebtoken")
const api = require("./api.js")

exports.follow = async (req, res) => {
    try {
        const follower = req.body.user_id
        const followed = req.body.followed_id
        if (await api.doesFollow(5, 1)) {
            res.status(500).json({
                error: `${followed} is already followed by ${follower}`,
            })

        } else {
            const SQL = "INSERT INTO relationships (follower_id, followed_id, created_at) VALUES ($1, $2, $3) RETURNING *"
            const values = [follower, followed, new Date(Date.now()).toISOString()]
            pool.query(SQL, values)
                .then((result) => {
                    const token = jwt.sign({ id: follower }, process.env.SECRET_KEY, { expiresIn: '1d' })
                    res.status(200).json({ message: `${follower} followed ${followed}`, token: token, id: follower })
                    return result
                })
                .catch((err) => {
                    console.error(err)
                    return res.status(500).json({
                        error: "Error following user."
                    })
                })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Database error while following user!", //Database connection error
        })

    }
}

exports.unfollow = async (req, res) => {
    try {
        const follower = req.body.user_id
        const followed = req.body.followed_id
        if (!await api.doesFollow(5, 1)) {
            res.status(500).json({
                error: `${followed} is not followed by ${follower}`,
            })

        } else {
            const SQL = "DELETE FROM relationships WHERE follower_id = $1 AND followed_id = $2"
            const values = [follower, followed]
            pool.query(SQL, values)
                .then((result) => {
                    const token = jwt.sign({ id: follower }, process.env.SECRET_KEY, { expiresIn: '1d' })
                    res.status(200).json({ message: `${follower} unfollowed ${followed}`, token: token, id: follower })
                    return result
                })
                .catch((err) => {
                    console.error(err)
                    return res.status(500).json({
                        error: "Error unfollowing user."
                    })
                })

        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Database error while following user!", //Database connection error
        })

    }
}