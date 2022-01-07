const express = require("express")
const mountRoutes = require("./routes")
//const cors = require("cors")
const path = require("path")
//const passport = require("passport")

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config()

// Create the Express application
const app = express()
mountRoutes(app)
app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'));


// Configures the database and opens a global connection that can be used in any module
require("./db")

// Pass the global passport object into the configuration function
//require("./config/passport")(passport)

// This will initialize the passport object on every request
//app.use(passport.initialize())

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
//app.use(require("./routes"))


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(process.env.PORT || 3000, () => {
    console.log("server successfly started.")
})
