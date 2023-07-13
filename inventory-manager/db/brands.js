"use strict";
const { query } = require("express");
const db = require("./queries")
const util = require("./util")
const baseQuery = "SELECT id, name, COUNT(id) OVER () AS total_count FROM brands"; // base query to append on
const orderBy = "brands.id ASC"

/**
 * get a list of brands
 * @param {*} limit maximum amount of results returned
 * @param {*} offset offset of results
 * @returns Array of results or undefined upon error/ null if no brands were found
 */
async function getBrands(limit, offset) {
    let query = baseQuery + " ORDER BY " + orderBy;
    query = util.addPagination(query, limit, offset);
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
    let query = baseQuery + " WHERE brands.name iLIKE REPLACE('%?%', '?', $1) ORDER BY " + orderBy;
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

/**
 * create a brand.
 * @param {object} brand - must include name, price, weight, ean, quantity and brand_id
 * @returns - brand name and newly associated ID
 */
async function createBrand(brand) {
    const {name, brand_id, animal_id} = brand
    /*
    exmaple query: "INSERT INTO brands(name, brand_id, animal_id) VALUES('Huskey la vista', 2, 2)"
    */
    if (util.isNameEmpty(name)) {
        return undefined
    }
    let query = "INSERT INTO brands(name) VALUES($1) RETURNING name, id"
    let results = await db.queryDB(query, [name])
    //error handling
    if (results === undefined) {
        return undefined
    }
    if (results.rowCount == 0) {
        return null
    }
    return results.rows
}

/**
 * update a brand by ID
 * @param {object} brand - brand object - valid brand id required and one or more of the existing brand properties to update
 * @returns the id and name of a brand from a given id or undefined upon error/null if no brand exists with the given id
 */
async function updateBrandByID (brand) {
    //set base query
    let query = "UPDATE brands SET";
    let values = [];
    [query, values] = util.updateItem(query, brand);
    let results = await db.queryDB(query, values);
    //error handling
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
    getBrandsBySubstring,
    createBrand,
    updateBrandByID
}