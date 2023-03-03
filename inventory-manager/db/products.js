"use strict";
const { query } = require("express");
const db = require("../db/queries")
const util = require("./util")

const baseQuery = "SELECT * FROM products"; // base query to append on if needed

/**
 * get a list of products
 * @param {*} limit maximum amount of results returned
 * @param {*} offset offset of results
 * @returns Array of results or undefined upon error/ null if no products were found
 */
async function getProducts(limit, offset) {
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
 * fetch a product by ID
 * @param {Array} id - params array with id of Number type
 * @returns the product with a given id or undefined upon error/ null if no product was found
 */
async function getProductByID (id) {
    let results = await db.queryDB("SELECT * FROM products WHERE id = $1", [id]);
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
 * @param {string} name exact product name to search by
 * @returns Array of results or undefined upon error/ null if no products were found
 */
async function getProductByName(name) {
    let query = baseQuery + " WHERE name = $1"
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
 * search the DB for products name containing the substring
 * @param {*} substring part of a product name
 * @param {*} limit maximum amount of results returned
 * @param {*} offset offset of results
 * @returns Array of results or undefined upon error/ null if no products were found
 */
async function getProductsBySubstring(substring, limit, offset) {
    //add conditions to base query and match name to a substring with any prefix and suffix
    let query = baseQuery + " WHERE name iLIKE REPLACE('%?%', '?', $1)";
    query = util.addPagination(query, limit, offset);
    let results = await db.queryDB(query, [substring]);
    if (results === undefined) {
        return undefined
    }
    if (results.rowCount == 0) {
        return null
    }
    return results.rows
}

module.exports = {
    getProducts,
    getProductByID,
    getProductByName,
    getProductsBySubstring
}