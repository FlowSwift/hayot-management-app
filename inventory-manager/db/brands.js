"use strict";
const { query } = require("express");
const db = require("./queries")
const util = require("./util")
const baseQuery = "SELECT id, name FROM brands"; // base query to append on

/**
 * get a list of brands
 * @param {*} limit maximum amount of results returned
 * @param {*} offset offset of results
 * @returns Array of results or undefined upon error/ null if no brands were found
 */
async function getBrands(limit, offset) {
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
 * fetch a brand by ID
 * @param {Array} id - params array with id of Number type
 * @returns the brand with a given id or undefined upon error/ null if no brand was found
 */
async function getBrandByID (id) {
    let query = baseQuery + " WHERE brands.id = $1"
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
 * @param {string} name exact brand name to search by
 * @returns Array of results or undefined upon error/ null if no brands were found
 */
async function getBrandByName(name) {
    let query = baseQuery + " WHERE brands.name = $1"
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
 * search the DB for brands name containing the substring
 * @param {*} substring part of a brand name
 * @param {*} limit maximum amount of results returned
 * @param {*} offset offset of results
 * @returns Array of results or undefined upon error/ null if no brands were found
 */
async function getBrandsBySubstring(substring, limit, offset) {
    //add conditions to base query and match name to a substring with any prefix and suffix
    let query = baseQuery + " WHERE brands.name iLIKE REPLACE('%?%', '?', $1)";
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
    getBrands,
    getBrandByID,
    getBrandByName,
    getBrandsBySubstring
}