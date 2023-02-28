"use strict";
const db = require("../db/queries")

/**
 * fetch a product by ID
 * @param {Array} id - params array with id of Number type
 * @returns object results - pg.Result object of the query. rows property is an empty array for empty queries
 */
async function getProductByID (id) {
    let results = await db.queryDB("SELECT * FROM products WHERE id = $1", id)
    return results
}

module.exports = {
    getProductByID
}