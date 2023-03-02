"use strict";
const { Pool } = require('pg')
const util = require("../helper/util")
 
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
 * @param {Array} params optional paramaters for the query string inside an array, use undefined if there is no params
 * @returns the query results object or undefined upon error
 */
async function queryDB(text, params, limit=25, offset=0) {
    let results
    [limit, offset] = util.checkPagination(limit, offset)
    text = text + " LIMIT " + limit
    text = text + " OFFSET " + offset
    try {
        results = await pool.query(text,params)
    } catch (error) {
        console.error(`ERROR in queryDB: ${error}`)
        console.trace(error)
        results = undefined
    }
    return results
}
  
module.exports = {
    queryDB
}