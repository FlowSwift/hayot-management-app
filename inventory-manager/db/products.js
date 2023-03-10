"use strict";
const { query } = require("express");
const db = require("../db/queries")
const util = require("./util")
const baseQuery = "SELECT products.id, products.name, products.price, categories.name AS category_name, brands.name AS brand_name, products.ean FROM products JOIN categories ON products.category_id = categories.id JOIN brands ON categories.brand_id = brands.id"; // base query to append on

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
    let query = baseQuery + " WHERE products.id = $1"
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
 * @param {string} name exact product name to search by
 * @returns Array of results or undefined upon error/ null if no products were found
 */
async function getProductByName(name) {
    let query = baseQuery + " WHERE products.name = $1"
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
    let query = baseQuery + " WHERE products.name iLIKE REPLACE('%?%', '?', $1)";
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
 * fetch a product by EAN from the DB
 * @param {Number} ean 
 * @returns the product with a given EAN or undefined upon error/ null if no product was found
 */ 
async function getProductByEAN(ean) {
    let query = baseQuery + " WHERE products.ean = $1";
    let results = await db.queryDB(query, [ean])
    if (results === undefined) {
        return undefined
    }
    if (results.rowCount == 0) {
        return null
    }
    return results.rows[0]
}

/**
 * 
 * @param {*} brand string of brand to query
 * @param {*} limit maximum amount of results returned
 * @param {*} offset offset of results
 * @returns a list of products based on the given brand. returns undefined up error/ null for no results
 */
async function getProductsByBrand(brand, limit, offset) {
    let query = baseQuery + " WHERE brands.name = $1";
    query = util.addPagination(query, limit, offset);
    //query
    let results = await db.queryDB(query, [brand]);
    //error checking
    if (results === undefined) {
        return undefined
    }
    if (results.rowCount == 0) {
        return null
    }
    return results.rows
}

async function getProductsByBrandCategory(brand, category, limit, offset) {
    let query = baseQuery + " WHERE brands.name = $1 and categories.name = $2";
    query = util.addPagination(query, limit, offset);
    //query
    let results = await db.queryDB(query, [brand, category]);
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
    getProducts,
    getProductByID,
    getProductByName,
    getProductsBySubstring,
    getProductByEAN,
    getProductsByBrand,
    getProductsByBrandCategory
}