"use strict";

/**
 * validate limit and offset, then set default values in the case of bad input
 * @param {Number} limit pagination limit parameter
 * @param {Number} offset pagination offset parameter
 * @returns Array of validated limit and offset
 */
function checkPagination(limit, offset) {
    if (isNaN(Number(limit)) || limit > 200 || limit < 1) {
        limit = 25
    }
    if (isNaN(Number(offset)) || offset < 0) {
        offset = 0
    }
    return [limit, offset]
}

/**
 * validate limit and offset and append to the query
 * @param {string} query DB query string
 * @param {Number} limit pagination limit parameter
 * @param {Number} offset pagination offset parameter
 * @returns new query string with limit and offset
 */
function addPagination(query, limit, offset) {
    [limit, offset] = checkPagination(limit,offset);
    return query + " LIMIT " + limit + " OFFSET " + offset;
}


function isNameEmpty(name) {
    if (name == "") {
        return true;
    }
    return false;
}

function updateItem(query, item) {
    //loop over item and add to query based on this format: " {key} ${i+1} ,"
    let i = 0
    let values = []
    for (var key in item) {
        if (["name", "price", "weight", "quantity", "ean", "category_id"].includes(key)) {
            query += " " + key.toLowerCase() + " = $" + (i+1) + ","
            values.push(item[key])
            i++
        }
    }
    query = query.slice(0, -1) //get rid of last ','
    values.push(item["id"])
    query += " WHERE id = $" + (i+1) + " RETURNING id, name"
    return [query, values]
}

module.exports = {
    checkPagination,
    addPagination,
    isNameEmpty,
    updateItem
}