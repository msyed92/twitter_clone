const pool = require("../../../config/database").pool
const jwt = require("jsonwebtoken")
const api = require("./api.js")

exports.follow = async (req, response) => {
    try {
        const follower = req.user.id
        const followed = req.body.profile_id
        if (await api.doesFollow(follower, followed)) {
            response.status(500).json({
                error: `${followed} is already followed by ${follower}`,
            })

        } else {
            const SQL = "INSERT INTO relationships (follower_id, followed_id, created_at) VALUES ($1, $2, $3) RETURNING *"
            const values = [follower, followed, new Date(Date.now()).toISOString()]
            pool.query(SQL, values)
                .then((result) => {
                    response.status(200).json({ message: `${follower} followed ${followed}`, follower_id: follower, followed_id: followed })
                    return result
                })
                .catch((err) => {
                    console.error(err)
                    return response.status(500).json({
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

exports.unfollow = async (req, response) => {
    try {
        const follower = req.user.id
        const unfollowed = req.body.profile_id
        if (!await api.doesFollow(follower, unfollowed)) {
            response.status(500).json({
                error: `${unfollowed} is not followed by ${follower}`,
            })

        } else {
            const SQL = "DELETE FROM relationships WHERE follower_id = $1 AND followed_id = $2"
            const values = [follower, unfollowed]
            pool.query(SQL, values)
                .then((result) => {
                    return response.status(200).json({ message: `${follower} unfollowed ${unfollowed}`, follower_id: follower, followed_id: unfollowed })
                })
                .catch((err) => {
                    console.error(err)
                    return response.status(500).json({
                        error: "Error unfollowing user."
                    })
                })

        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Database error while unfollowing user!", //Database connection error
        })

    }
}