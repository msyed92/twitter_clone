const pool = require("../../../config/database").pool
const api = require("./api.js")

//submit a new tweet

const del = async (req, response, next) => {
    try {
        const user = req.user.id
        const tweet = req.body.tweet_id

        const valid = await api.checkUser(user, tweet).then((r) => { return r }).catch((e) => { throw e })
        if (valid) {
            let query = "DELETE FROM likes where tweet_id = $1"
            let values = [tweet]
            pool.query(query, values)
                .then((r) => {
                    query = "DELETE FROM retweets where tweet_id = $1"
                    pool.query(query, values).then((r) => {
                        query = "DELETE FROM tweets WHERE id = $1 AND user_id = $2"
                        values = [tweet, user]
                        pool.query(query, values)
                            .then((r) => {
                                return response.status(200).json({ success: true, msg: `Tweet deleted!`, user: user })

                            }).catch((e) => { throw e })
                    }).catch((e) => { throw e })
                }).catch((err) => {
                    return response.status(500).json({
                        success: false,
                        msg: "Error deleting tweet."
                    })
                })

        }
    }
    catch (err) { throw err }
}

const edit = async (req, response, next) => {
    try {
        const user = req.user.id
        const tweet = req.body.tweet_id
        const content = req.body.content

        const valid = await api.checkUser(user, tweet).then((r) => { return r }).catch((e) => { throw e })

        if (valid) {
            const query = 'UPDATE tweets SET content = $1, update_at = NOW() WHERE id = $2'
            const values = [content, tweet]
            pool.query(query, values)
                .then((r) => {
                    return response.status(200).json({ success: true, msg: `Tweet edited!`, user: user, tweet: content })

                })
                .catch((err) => {
                    console.error(err)
                    return response.status(500).json({
                        success: false,
                        msg: "Error editing tweet."
                    })
                })
        } else {
            return response.status(200).json({ success: false, msg: `Not authorized to edit tweet` })
        }



    }
    catch { }
}

const submit = async (req, response, next) => {
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
                return response.status(200).json({ success: true, msg: `Tweet submitted!`, user: db_user.username, tweet: content })
            })
            .catch((err) => {
                console.error(err)
                return response.status(500).json({
                    success: false,
                    msg: "Error submitting tweet."
                })
            })

    } catch (err) {
        console.error()
        return response.status(500).json({
            success: false,
            msg: "Database error while submitting tweet!", //Database connection error
        })

    }
}

const getTL = async (req, response, next) => {

    try {
        const id = req.user.id
        const local = await api.getFollowed(id).then((f) => { return f.rows }).catch((err) => { throw err })
        const follows = local
        const tweets_ = await Promise.all(follows.map(async (p) => {
            const t = await api.getTweets('user_id', p.followed_id)
            return t
        }))
        let tweets = tweets_.flat()
        tweets.sort((a, b) => {
            const ans = []
            const vals = [[a.updated_at, a.created_at], [b.updated_at, b.created_at]]
            vals.forEach((e) => {
                if (e[0] == null) {
                    ans.push(e[1])
                } else {
                    ans.push(e[0])
                }
            })
            return ans[1] - ans[0]

        });

        tweets.forEach(async (e) => {
            e.user_id = await api.getUserFromTweet(e.id).then((r) => { return r[0].user_id })
        })


        const RTS_ = await Promise.all(follows.map(async (p) => {
            if (p.followed_id != id) {
                const r = await api.getInteractions(0, "retweets", p.followed_id)
                return r.rows
            } else {
                return []
            }
        }))
        let retweets = RTS_.flat()
        if (retweets.length > 0) {
            retweets.sort((a, b) => {
                const ans = []
                const vals = [[a.updated_at, a.created_at], [b.updated_at, b.created_at]]
                vals.forEach((e) => {
                    if (e[0] == null) {
                        ans.push(e[1])
                    } else {
                        ans.push(e[0])
                    }
                })
                return ans[1] - ans[0]

            })
            const tweet_ids = tweets.map((t) => { return t.id })
            retweets = retweets.filter(rt => !tweet_ids.includes(rt.tweet_id))
            retweets.forEach(async rt => {
                rt.tweet = await api.getTweets('id', rt.tweet_id)
            })
        }
        return response.status(200).json({ message: "Timeline tweets found", id: id, tweets: tweets })
    } catch (err) {
        next()
    }
}

const getWhoToFollow = async (req, response, next) => {
    try {
        const id = req.user.id
        const newLocal = await api.getRandomUsers(id).then((u) => { return u.rows }).catch((err) => { throw err })
        const randoms = newLocal
        const newLocal_ = await Promise.all(randoms.map(async (p) => {
            return await api.getTweets('user_id', p.followed_id)
        }))
        const tweets = []
        newLocal_.forEach((e) => {
            if (e.length > 0) {
                tweets.push(e[Math.floor((Math.random() * e.length))])
            }
        })
        return response.status(200).json({ message: "Who to follow tweets found", id: id, tweets: tweets })
    }
    catch (err) { throw err }
}

const getUser = async (req, res) => {
    try {
        const id = req.user.id
        const { username } = req.params
        const local = await api.getUser("username", username.toLowerCase()).then((u) => { return u.rows[0] }).catch((err) => { throw err })
        if (local) {
            const profile = local
            const local_ = await api.getTweets('user_id', profile.id).then((t) => { return t.rows }).catch((err) => { throw err })
            const tweets = local_
            return res.status(200).json({ success: true, message: "User tweets found", profile: profile.id, id: id, tweets: tweets })
        } else {
            return res.status(200).json({ success: true, message: "User does not exist", id: id })
        }


    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: "Database error occurred while finding user!", //Database connection error
        })
    }
}

module.exports.getWhoToFollow = getWhoToFollow
module.exports.getUser = getUser
module.exports.getTL = getTL
module.exports.submit = submit
module.exports.edit = edit
module.exports.del = del