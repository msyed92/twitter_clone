const { Pool, Client } = require("pg");

const credentials = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: false
};

const client = new Client(credentials)
const pool = new Pool(credentials)

module.exports.client = client
module.exports.pool = pool