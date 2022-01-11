const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the Postgres user ID
 */
function issueJWT(user) {

    const id = user.id;
    const expiresIn = '1d';

    const payload = {
        sub: id,
        iat: Date.now()
    };

    const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

module.exports.issueJWT = issueJWT
