"use strict";
const db = require("./queries")
const util = require("./util")
const baseQuery = "SELECT id, type FROM animals"; // base query to append on

/**
 * get a list of animals
 * @param {*} limit maximum amount of results returned
 * @param {*} offset offset of results
 * @returns Array of results or undefined upon error/ null if no animals were found
 */
async function getAnimals(limit, offset) {
    let query = util.addPagination(baseQuery, limit, offset);
    let results = await db.queryDB(query);
    if (results === undefined) {
        return undefined
    }
    if (results.rowCount == 0) {
        return null
    }
    return results.rows
}

module.exports = {
    getAnimals,
}