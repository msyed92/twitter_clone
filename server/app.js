const http = require('http')
const path = require('path')
const methods = require('methods')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')
const errorhandler = require('errorhandler')


/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config()
const PORT = process.env.PORT || 5000
const isProduction = process.env.NODE_ENV === 'production'


// Connect to pg database
require("./config/database")

// Create the Express application
const app = express()
app.use(cors())

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('method-override')())
app.use(express.static(__dirname + '/public'))

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))
if (!isProduction) {
    app.use(errorhandler())
}
/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js

app.use(require('./routes'))


/**
 * -------------- ERRORS ----------------
 */

app.use(function (req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function (err, req, res, next) {
        console.log(err.stack)

        res.status(err.status || 500)

        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        })
    })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    })
})

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})