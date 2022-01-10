require("dotenv").config()
const api = require("./api/functions/api")
const jwt = require("jsonwebtoken")
const ejwt = require("express-jwt")
const isAuthenticated = require("passport").isAuthenticated
const secret = process.env.SECRET_KEY || "secret"

async function generateJWT(user) {
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() * 60 * 60)
    const local = await api.getUser("username", user.username)
    const db_user = local.rows[0]

    return jwt.sign({
        email: db_user.email,
        id: db_user.id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, secret)
}

async function toAuthJSON(user) {

    const local = await api.getUser("username", user.username)
    const db_user = local.rows[0]

    return {
        id: db_user.id,
        email: db_user.email,
        token: await generateJWT({ username: db_user.username, email: db_user.email, id: db_user.id })
    }
}

function getTokenFromHeader(req) {
    if (req.headers.authorization) {
        return req.headers.authorization
    }
    return null
}

function checkAuthentication(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/api/user/login')
        return;
    }
    next();
}

const auth = {
    required: ejwt({
        secret: secret,
        userProperty: "payload",
        getToken: getTokenFromHeader,
        algorithms: ["RS256"]
    }),
    optional: ejwt({
        secret: secret,
        userProperty: "payload",
        credentialsRequired: false,
        getToken: getTokenFromHeader,
        algorithms: ["RS256"]
    })
}

module.exports.auth = auth
module.exports.toAuthJSON = toAuthJSON
module.exports.generateJWT = generateJWT
module.exports.checkAuthentication = checkAuthentication



