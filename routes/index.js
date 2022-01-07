// ./routes/index.js
const users = require('./user')
const default_ = require('./default')

module.exports = app => {
    app.use('/users', users)
    app.use('/', default_)

}