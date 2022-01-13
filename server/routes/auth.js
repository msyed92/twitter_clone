const jwt = require("jsonwebtoken")
require("dotenv").config({ path: "../../.env" })
const EXP_TIME = process.env.JWT_EXPIRATION_TIME
const secret = process.env.JWT_SECRET

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the Postgres user ID
 */
function issueJWT(user) {

    const id = user.id;
    const expiresIn = '1d';

    const payload = {
        sub: id,
        iat: Date.now(),
        expiresIn: new Date(Date.now() + parseInt(EXP_TIME))
    };

    const signedToken = jwt.sign(payload, secret, { expiresIn: expiresIn });

    return {
        token: signedToken,
        expires: expiresIn
    }
}

module.exports.issueJWT = issueJWT
