const pool = require("../../config/database").pool

async function getUser(col, val) {
    const SQL = `SELECT * FROM users WHERE ${col} = $1`;
    const values = [val];
    return pool.query(SQL, values)
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

module.exports.getUser = getUser
module.exports.registerUser = registerUser
module.exports.getTweets = getTweets
