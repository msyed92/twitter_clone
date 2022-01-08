const fs = require('fs')
const path = require('path')
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require("../db")

const pathToKey = path.join(__dirname, '..', '/db/id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}
const strategy = new jwtStrategy(options, (payload, done) => {
    db.query('SELECT * FROM users WHERE id = $1', [payload.sub])
        .then((user) => {
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch((err) => done(err, null))
})


// export
module.exports = (passport) => {
    passport.use(strategy)
}

