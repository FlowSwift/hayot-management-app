"use strict";
const { query } = require("express");
const db = require("./queries")
const util = require("./util")
const baseQuery = "SELECT categories.id, categories.name, categories.brand_id, brands.name as brand_name FROM categories JOIN brands ON categories.brand_id = brands.id"; // base query to append on

/**
 * get a list of categories
 * @param {*} limit maximum amount of results returned
 * @param {*} offset offset of results
 * @returns Array of results or undefined upon error/ null if no categories were found
 */
async function getCategories(limit, offset) {
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

/**
 * fetch a category by ID
 * @param {Array} id - params array with id of Number type
 * @returns the category with a given id or undefined upon error/ null if no category was found
 */
async function getCategoryByID (id) {
    let query = baseQuery + " WHERE categories.id = $1"
    let results = await db.queryDB(query, [id]);
    if (results === undefined) {
        return undefined
    }
    if (results.rowCount == 0) {
        return null
    }
    return results.rows[0]
}

/**
 * search the DB with the name provided
 * @param {string} name exact category name to search by
 * @returns Array of results or undefined upon error/ null if no categories were found
 */
async function getCategoryByName(name) {
    let query = baseQuery + " WHERE categories.name = $1"
    let results = await db.queryDB(query, [name]);
    if (results === undefined) {
        return undefined
    }
    if (results.rowCount == 0) {
        return null
    }
    return results.rows
}

/**
 * search the DB for categories name containing the substring
 * @param {*} substring part of a category name
 * @param {*} limit maximum amount of results returned
 * @param {*} offset offset of results
 * @returns Array of results or undefined upon error/ null if no categories were found
 */
async function getCategoriesBySubstring(substring, limit, offset) {
    //add conditions to base query and match name to a substring with any prefix and suffix
    let query = baseQuery + " WHERE categories.name iLIKE REPLACE('%?%', '?', $1)";
    query = util.addPagination(query, limit, offset);
    //query
    let results = await db.queryDB(query, [substring]);
    //error checking
    if (results === undefined) {
        return undefined
    }
    if (results.rowCount == 0) {
        return null
    }
    return results.rows
}

module.exports = {
    getCategories,
    getCategoryByID,
    getCategoryByName,
    getCategoriesBySubstring
}