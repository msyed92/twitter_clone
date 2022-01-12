const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

const EXP_TIME = process.env.JWT_EXPIRATION_TIME

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

    const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn });

    return {
        token: signedToken,
        expires: expiresIn
    }
}

module.exports.issueJWT = issueJWT
