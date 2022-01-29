const pool = require("../../../config/database").pool

async function getInteractions(id, type = "likes", user = 0,) {
    let SQL = ''
    let values;
    if (user === 0) {
        SQL = `SELECT * FROM ${type} WHERE tweet_id = $1`
        values = [id]
    } else {
        SQL = `SELECT * FROM ${type} WHERE tweet_id = $1 AND user_id = $2`
        values = [id, user]
    }

    return await pool.query(SQL, values)
        .then((result) => {
            return result
        })
        .catch((err) => {
            throw err
        })
}

async function getUser(col, val) {
    const SQL = `SELECT * FROM users WHERE ${col} = $1`
    const values = [val]
    return await pool.query(SQL, values)
        .then((result) => {
            return result
        })
        .catch((err) => {
            throw err
        })
}

async function registerUser(user) {
    const SQL = `INSERT INTO users (username, email, phone, first_name, last_name, hash, salt, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`
    const values = [user.username, user.email, user.phone, user.firstName, user.lastName, user.hash, user.salt, user.time]
    return pool.query(SQL, values)
        .then((result) => {
            return result
        })
        .catch((err) => {
            throw err
        })

}

async function getUserFromTweet(id) {
    const SQL = "SELECT user_id FROM tweets WHERE id = $1"
    const values = [id]
    return pool.query(SQL, values)
        .then((result) => {
            return result.rows
        })
        .catch((err) => {
            throw err
        })

}

async function getTweets(id) {
    const SQL = "SELECT * FROM tweets WHERE user_id = $1"
    const values = [id]
    return pool.query(SQL, values)
        .then((result) => {
            return result.rows
        })
        .catch((err) => {
            throw err
        })
}
async function getFollowers(id) {
    const SQL = "SELECT follower_id FROM relationships WHERE followed_id = $1"
    const values = [id]
    return pool.query(SQL, values)
        .then((result) => {
            return result.rows
        })
        .catch((err) => {
            throw err
        })
}

async function getFollowed(id) {
    const SQL = "SELECT followed_id FROM relationships WHERE follower_id = $1"
    const values = [id]
    return pool.query(SQL, values)
        .then((result) => {
            return result
        })
        .catch((err) => {
            throw err
        })
}

async function getRandomUsers(id) {
    const SQL = 'SELECT * FROM (SELECT DISTINCT followed_id FROM relationships WHERE follower_id != $1) t ORDER BY random() LIMIT 10'
    const values = [id]
    return pool.query(SQL, values)
        .then((result) => {
            return result
        })
        .catch((err) => {
            throw err
        })

}

async function doesFollow(follower, followed) {
    await getFollowers(followed)
        .then((result) => {
            let ans = result.map((follower) => follower.follower_id)
            return ans.includes(follower)
        })
        .catch((err) => {
            throw err
        })
}


module.exports.getUser = getUser
module.exports.getInteractions = getInteractions
module.exports.registerUser = registerUser
module.exports.getTweets = getTweets
module.exports.getFollowers = getFollowers
module.exports.getFollowed = getFollowed
module.exports.doesFollow = doesFollow
module.exports.getRandomUsers = getRandomUsers
module.exports.getUserFromTweet = getUserFromTweet
