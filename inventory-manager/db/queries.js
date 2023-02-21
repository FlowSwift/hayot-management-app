const { Pool } = require('pg')
 
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  })

async function queryDB(text, params) {
    try {
        return await pool.query(text,params)
    } catch (error) {
        console.error(`ERROR: ${error}`)
    }
}
  
module.exports = {
    query: (text, params) => pool.query(text, params),
    queryDB,
}