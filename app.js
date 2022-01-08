const express = require("express")
const path = require("path")
const passport = require("passport")
const passportJWT = require("passport-jwt")
const jwt = require("jsonwebtoken")

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config()

// Create the Express application
const app = express()
require("./config/database")
require("./config/passport")(passport)


//use passport && body parser
app.use(passport.initialize())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))



/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js

app.use(require("./routes"))

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(process.env.PORT || 3000, () => {
    console.log("server successfly started.")
})
