"use strict";
const db = require("./queries")
const util = require("./util")
const baseQuery = 
`SELECT
categories.id,
categories.name,
categories.brand_id,
brands.name as brand_name,
categories.animal_id,
animals.type as animal_type,
COUNT(categories.id) OVER () AS total_count
FROM categories JOIN brands ON categories.brand_id = brands.id JOIN animals ON animals.id = categories.animal_id`; 
// base query to append on
const orderBy = "categories.id ASC"

/**
 * get a list of categories
 * @param {*} limit maximum amount of results returned
 * @param {*} offset offset of results
 * @returns Array of results or undefined upon error/ null if no categories were found
 */
async function getCategories(limit, offset) {
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
 * search the DB with the brand ID provided
 * @param {string} id exact brand ID to search by
 * @returns Array of results or undefined upon error/ null if no categories were found
 */
async function getCategoriesByBrandId(id) {
    let query = baseQuery + " WHERE categories.brand_id = $1"
    let results = await db.queryDB(query, [id]);
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
    let query = baseQuery + " WHERE categories.name iLIKE REPLACE('%?%', '?', $1) ORDER BY " + orderBy;
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
 * create a category.
 * @param {object} category - must include name, price, weight, ean, quantity and category_id
 * @returns - category name and newly associated ID
 */
async function createCategory(category) {
    const {name, brand_id, animal_id} = category
    /*
    exmaple query: "INSERT INTO categories(name, brand_id, animal_id) VALUES('Huskey la vista', 2, 2)"
    */
    if (util.isNameEmpty(name)) {
        return undefined
    }
    let query = "INSERT INTO categories(name, brand_id, animal_id) VALUES($1, $2, $3) RETURNING name, id"
    let results = await db.queryDB(query, [name, brand_id, animal_id])
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
 * update a category by ID
 * @param {object} category - category object - valid category id required and one or more of the existing category properties to update
 * @returns the id and name of a category from a given id or undefined upon error/null if no category exists with the given id
 */
async function updateCategoryByID (category) {
    //set base query
    let query = "UPDATE categories SET";
    let values = [];
    [query, values] = util.updateItem(query, category);
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
    getCategories,
    getCategoryByID,
    getCategoriesByBrandId,
    getCategoryByName,
    getCategoriesBySubstring,
    createCategory,
    updateCategoryByID
}