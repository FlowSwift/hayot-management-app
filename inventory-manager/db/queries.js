"use strict";
const { Pool } = require('pg')
 
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  })

/**
 * 
 * @param {*} text db query string
 * @param {Array} params optional paramaters for the query string inside an array
 * @returns object results - pg.Result object of the query
 */
async function queryDB(text, params) {
    let results
    try {
        results = await pool.query(text,params)
    } catch (error) {
        console.error(`ERROR: ${error}`)
        throw new Error(error)
    }
    finally {
        return results
    }
}
  
module.exports = {
    queryDB
}