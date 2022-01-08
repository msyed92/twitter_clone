const fs = require("fs")
const path = require("path")
const db = require("./database")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt

const pathToKey = path.join(__dirname, "..", "/id_rsa_pub.pem")
const PUB_KEY = fs.readFileSync(pathToKey, "utf8")

//jwtStrategy options
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"]
}

const strategy = new JwtStrategy(options, (payload, done) => {
    const query = "SELECT * FROM users WHERE id = $1"
    const values = [payload.sub]
    db.query(query, values)
        .then((res) => {
            const user = res.rows[0]
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch((err) => {
            done(err, null)
        })

})


// export
module.exports = (passport) => {
    passport.use(strategy)
}

