const fs = require("fs")
const path = require("path")
const db = require("./database")
const utils = require("../lib/utils")
const LocalStrategy = require("passport-local").Strategy

// const pathToKey = path.join(__dirname, "..", "/id_rsa_pub.pem")
// const PUB_KEY = fs.readFileSync(pathToKey, "utf8")


const loginStrategy = new LocalStrategy((username, password, done) => {
    const query = "SELECT * FROM users WHERE username = $1"
    const values = [username]
    db.query(query, values)
        .then((res) => {
            console.log("USER SUCCESS!")

            const user = res.rows[0]
            if (!user) {
                return done(null, false, { message: `User ${username} does not exist` })
            }
            if (!utils.validPassword(password, user.hash, user.salt)) {
                return done(null, false, { message: "invalid password" })
            }
            return done(null, user)
        })
        .catch((err) => {
            done(err, null)
        })

})

// const registerStrategy = new LocalStrategy(
//     { usernameField: "username", passwordField: "password", passReqToCallback: true },
//     function (req, username, password, done) {
//         const query = "SELECT * FROM users WHERE id = $1"
//         const values = [username]
//         db.query(query, values)
//             .then((res) => {
//                 const user = res.rows[0]
//                 if (err) { return done(err) }
//                 if (user) { return done(null, false, req.flash("signupMessage", "That email/username is already taken.")) }
//                 else {
//                     const saltHash = utils.genPassword(password)
//                     const salt = saltHash.salt
//                     const hash = saltHash.hash

//                     const query = "INSERT INTO users (username, email_num, hash, salt, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *"
//                     const values = [username, [req.body.token], hash, salt, new Date(Date.now()).toISOString()]

//                     db.query(query, values)
//                         .then((res) => {
//                             const user = res.rows[0]
//                             console.log(user)

//                         })
//                 }
//             })
//             .catch((err) => {
//                 done(err, null)
//             })

//     })




// export
module.exports = (passport) => {
    passport.use("local", loginStrategy)

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
        const query = "SELECT * FROM users WHERE id = $1"
        const values = [id]
        db.query(query, values)
            .then((user) => {
                //log.debug("deserializeUser ", user)
                done(null, user)
            })
            .catch((err) => {
                done(new Error(`User with the id ${id} does not exist`))
            })
    })
}

