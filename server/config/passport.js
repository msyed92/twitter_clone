const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const pool = require("./database").pool
const pw = require("../routes/api/functions/password")

const strategy = new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
}, (username, password, done) => {
    const SQL = "SELECT * FROM users WHERE username = $1"
    const values = [username]
    pool.query(SQL, values)
        .then((result) => {
            const user = result.rows[0]
            if (!user || !pw.validPassword(password, user.hash, user.salt)) {
                return done(null, false, { errors: { "email or password": "is invalid" } })
            }
            return done(null, user)
        })
        .catch(done)
})


module.exports = (passport) => {
    passport.use(strategy)

}
