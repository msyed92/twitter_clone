const express = require("express")
const PORT = process.env.PORT || 3000
const cors = require("cors");
const bodyParser = require("body-parser");
const pg = require("pg")

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config()
require("./config/database")

// client.connect((err) => { //Connected Database
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("Data logging initiated!")
//     }

// })

// Create the Express application
const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js

app.use(require("./routes"))

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(PORT, () => {
    console.log("server successfly started.")
})
