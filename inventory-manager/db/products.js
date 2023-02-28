"use strict";
const db = require("../db/queries")

/**
 * fetch a product by ID
 * @param {Array} id - params array with id of Number type
 * @returns the product with a given id or undefined upon error/ null if no product was found
 */
async function getProductByID (id) {
    let results = await db.queryDB("SELECT * FROM products WHERE id = $1", id);
    if (results === undefined) {
        return undefined
    }
    if (results.rowCount == 0) {
        return null
    }
    return results.rows[0]
}

module.exports = {
    getProductByID
}