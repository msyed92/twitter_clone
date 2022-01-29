const pool = require("../../../config/database").pool
const api = require("./api.js")

exports.getInteractions = async (req, response, next) => {
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

exports.like = async (req, response, next) => {
    try {
        const liker = req.user.id
        const tweet = req.body.tweet_id

        const likes = await api.getInteractions(tweet, "likes", liker)
            .then((result) => { return result.rows })
            .catch((err) => { throw err })
        let SQL;
        let values;
        let message;

        if (likes.length != 0) {
            SQL = `DELETE FROM likes WHERE tweet_id = $1 AND user_id = $2 RETURNING *`
            values = [tweet, liker]
            message = 'unliked'
        } else {
            SQL = `INSERT INTO likes (tweet_id, created_at, user_id) VALUES ($1, $2, $3) RETURNING *`
            values = [tweet, new Date(Date.now()).toISOString(), liker]
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
        console.log(err)
        response.status(500).json({
            error: "Database error while liking tweet!", //Database connection error
        })

    }
}

exports.retweet = async (req, response, next) => {
    try {
        const retweeter = req.user.id
        const tweet = req.body.tweet_id
        const RTs = await api.getInteractions(tweet, retweeter, "retweets")
            .then((result) => { return result.rows }).catch((err) => { throw err })
            .catch((err) => { throw err })
        console.log(RTs)

        let SQL;
        let values;
        let message;

        if (RTs.length != 0) {
            SQL = `DELETE FROM retweets WHERE tweet_id = $1 AND user_id = $2 RETURNING *`
            values = [tweet, retweeter]
            message = 'unretweeted'
        } else {
            SQL = `INSERT INTO retweets (tweet_id, created_at, user_id) VALUES ($1, $2, $3) RETURNING *`
            values = [tweet, new Date(Date.now()).toISOString(), retweeter]
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
        console.log(err)
        response.status(500).json({
            error: "Database error while retweeting tweet!", //Database connection error
        })

    }
}

exports.follow = async (req, response) => {
    try {
        const follower = req.user.id
        const followed = req.body.profile_id
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
        console.log(err)
        return res.status(500).json({
            error: "Database error while following user!", //Database connection error
        })

    }
}