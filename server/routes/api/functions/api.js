const pool = require("../../../config/database").pool

const getInteractions = async (id, type = "likes", user = 0,) => {
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

const getUser = async (col, val) => {
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

const registerUser = async (user) => {
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

const getUserFromTweet = async (id) => {
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

const getTweets = async (id) => {
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
const getFollowers = async (id) => {
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

const getFollowed = async (id) => {
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

const getRandomUsers = async (id) => {
    const SQL = 'SELECT DISTINCT followed_id FROM relationships WHERE followed_id NOT IN (SELECT followed_id FROM relationships WHERE follower_id = $1) LIMIT 10'
    const values = [id]
    try {
        const result = await pool.query(SQL, values);
        return result;
    } catch (err) {
        throw err;
    }

}

const doesFollow = async (follower, followed) => {
    const SQL = "SELECT follower_id FROM relationships WHERE follower_id = $1 AND followed_id = $2"
    const values = [follower, followed]
    try {
        const result = await pool.query(SQL, values);
        return result.rows.length == 1;
    } catch (err) {
        throw err;
    }
}

const checkUser = async (u, t) => {
    const q = 'SELECT user_id FROM tweets WHERE id = $1'
    const v = [t]
    return pool.query(q, v)
        .then((r) => {
            return r.rows[0].user_id == u
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
module.exports.checkUser = checkUser
