const api = require("../api.js")

exports.protected = async (req, res, next) => {
    await api.getUser("id", req.sub)
        .then((user) => {
            if (!user) { return res.status(401).json({ success: false, message: "Not authorized." }); }

            if (Object.keys(req.params).length === 0) {
                return res.json({ success: true, message: "you have enetered the protected route!" });
            }
            next()

        }).catch(next);

}

exports.profile = async (req, res, next) => {
    await api.getUser("username", req.params.username)
        .then(async (prof) => {
            const user = prof.rows[0]
            if (prof.rows.length == 0) { return res.status(200).json({ success: true, message: "user not found" }) }
            await api.getTweets(user.id).then((tweets) => {
                return res.status(200).json({ success: true, message: "user tweets found", tweets: tweets.rows })
            }).catch((err) => { throw err })
        })
}