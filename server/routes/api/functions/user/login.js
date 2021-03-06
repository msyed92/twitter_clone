const utils = require("../password")
const api = require("../api.js")
const auth = require('../../../auth');

//Login Function
const login = async (req, res, next) => {
    const { username, password, type } = req.body
    try {
        const user = await api.getUser(type, username).then((result) => { return result.rows[0] }).catch((err) => { next(err) })
        let message = ''
        if (!user) {
            message = "could not find user"
            return res.status(401).json({ success: false, msg: message });
        }

        // Function defined at bottom of app.js
        const isValid = utils.validPassword(password, user.hash, user.salt);

        if (isValid) {
            const tokenObject = auth.issueJWT(user)
            message = "succesfully logged in"
            return res.cookie('jwt', tokenObject.token,
                {
                    httpOnly: true,
                    secure: false //--> SET TO TRUE ON PRODUCTION
                }
            ).status(200).json({ success: true, expiresIn: tokenObject.expires, msg: message });
        } else {
            message = "you entered the wrong password"
            return res.status(401).json({ success: false, msg: message });
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        })
    }
}

const logout = async (req, res) => {
    if (req.cookies['jwt']) {
        return res.clearCookie('jwt')
            .status(200)
            .json({ success: true, message: "You have logged out" })
    } else {
        return res.status(401).json({ error: 'Invalid jwt' })
    }
}

module.exports.logout = logout
module.exports.login = login