const express = require("express")
const mountRoutes = require("./routes")
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
require("./db/index")
require("./db/passport")(passport)


//use passport && body parser
app.use(passport.initialize())

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js

app.use(express.static(__dirname + "/public"))

// body-parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mountRoutes(app)
app.set("view engine", "ejs")

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(process.env.PORT || 3000, () => {
    console.log("server successfly started.")
})
