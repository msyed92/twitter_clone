
// File: ./config/passport
const JwtStrategy = require("passport-jwt").Strategy
const fs = require("fs")
const path = require("path")
const api = require("../routes/api/functions/api")

// Go up one directory, then look for file name
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');

// The verifying public key
const PUB_KEY = fs.readFileSync(pathToKey, "utf8")

const cookieExtractor = async (req) => {
    let jwt = null

    if (req && req.cookies) {
        jwt = req.cookies['jwt']
    }
    return jwt
}


// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: PUB_KEY,
    //algorithms: ["RS256"]
}

const strategy = new JwtStrategy(options, async (jwt_payload, done) => {
    // Since we are here, the JWT is valid!
    // We will assign the `sub` property on the JWT to the database ID of user
    await api.getUser("id", jwt_payload.sub)
        .then((result) => {
            const user = result.rows[0]
            if (user) {
                // Since we are here, the JWT is valid and our user is valid, so we are authorized!
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch((err) => {
            return done(err, false)
        })
})

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(strategy)
}
