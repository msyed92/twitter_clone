const pool = require("../../../config/database").pool
const api = require("./api.js")

const doesFollow = async (req, response, next) => {
    try {
        const user = req.body.viewer_id
        const poster = req.body.id
        let follows = true;
        if (user != poster) {
            follows = await api.doesFollow(user, poster).then((r) => {
                return r
            }).catch((e) => { throw e })
        }

        return response.status(200).json({ success: true, follows: follows })
    }
    catch (err) {
        throw err
    }
}

const getInteractions = async (req, response, next) => {
    try {
        const user = req.user.id
        const tweet = req.body.tweet_id
        const likes = await api.getInteractions(id = tweet, type = "likes")
            .then((result) => { return result.rows })
            .catch((err) => { throw err })
        const retweets = await api.getInteractions(id = tweet, type = "retweets")
            .then((result) => { return result.rows })
            .catch((err) => { throw err })
        return response.status(200).json({ success: true, tweet: tweet, likes: likes, retweets: retweets })


    }
    catch (err) {
        throw err
    }
}

const like = async (req, response, next) => {
    try {
        const liker = req.user.id
        const tweet = req.body.tweet_id

        const likes = await api.getInteractions(tweet, "likes", liker)
            .then((result) => { return result.rows })
            .catch((err) => { throw err })
        let SQL;
        let message;
        let values = [tweet, liker]
        if (likes.length != 0) {
            SQL = `DELETE FROM likes WHERE tweet_id = $1 AND user_id = $2 RETURNING *`
            message = 'unliked'
        } else {
            SQL = `INSERT INTO likes (tweet_id, created_at, user_id) VALUES ($1, NOW(), $2) RETURNING *`
            message = 'liked'
        }
        await pool.query(SQL, values)
            .then((result) => {
                return response.status(200).json({ success: true, message: `${liker} ${message} ${tweet}` })
            })
            .catch((err) => {
                console.error(err)
                return response.status(500).json({
                    error: "Error liking tweet."
                })
            })
    } catch (err) {
        console.error(err)
        response.status(500).json({
            error: "Database error while liking tweet!", //Database connection error
        })

    }
}

const retweet = async (req, response, next) => {
    try {

        const retweeter = req.user.id
        const tweet = req.body.tweet_id
        const RTs = await api.getInteractions(tweet, "retweets", retweeter)
            .then((result) => { return result.rows }).catch((err) => { throw err })
            .catch((err) => { throw err })

        let SQL;
        let values = [tweet, retweeter]
        let message;

        if (RTs.length != 0) {
            SQL = `DELETE FROM retweets WHERE tweet_id = $1 AND user_id = $2 RETURNING *`
            message = 'unretweeted'
        } else {
            SQL = `INSERT INTO retweets (tweet_id, created_at, user_id) VALUES ($1, NOW(), $2) RETURNING *`
            message = 'retweeted'
        }
        await pool.query(SQL, values)
            .then((result) => {
                return response.status(200).json({ success: true, message: `${retweeter} ${message} ${tweet}` })
            })
            .catch((err) => {
                console.error(err)
                return response.status(500).json({
                    error: "Error retweeting tweet."
                })
            })
    } catch (err) {
        console.error(err)
        response.status(500).json({
            error: "Database error while retweeting tweet!", //Database connection error
        })

    }
}

const follow = async (req, response) => {
    try {
        const follower = req.body.viewer_id
        const followed = req.body.id
        const doesFollow = await api.doesFollow(follower, followed)
            .then((res) => { return res })
            .catch((err) => { throw err })

        let SQL;
        let values;
        let message;


        if (doesFollow) {
            SQL = "DELETE FROM relationships WHERE follower_id = $1 AND followed_id = $2"
            values = [follower, followed]
            message = 'unfollow'


        } else {
            SQL = "INSERT INTO relationships (follower_id, followed_id, created_at) VALUES ($1, $2, $3) RETURNING *"
            values = [follower, followed, new Date(Date.now()).toISOString()]
            message = 'follow'
        } pool.query(SQL, values)
            .then((result) => {
                return response.status(200).json({ success: true, message: `${follower} ${message}ed ${followed}` })
            })
            .catch((err) => {
                console.error(err)
                return response.status(500).json({
                    error: "Error with following/unfollowing user."
                })
            })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: "Database error while following user!", //Database connection error
        })

    }
}

module.exports.doesFollow = doesFollow
module.exports.getInteractions = getInteractions
module.exports.like = like
module.exports.retweet = retweet
module.exports.follow = follow