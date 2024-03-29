"use strict";
const db = require("./queries")
const util = require("./util")
const baseQuery =
  `SELECT
logs.id,
users.username AS user_username,
products.name AS product_name,
categories.name AS category_name,
brands.name AS brand_name,
logs.action_type,
logs.old_value,
logs.new_value,
logs.log_time,
COUNT(logs.id) OVER () AS total_count
FROM
  logs
JOIN
  users ON logs.user_id = users.id
JOIN
  products ON logs.product_id = products.id
JOIN
  categories ON products.category_id = categories.id
JOIN
  brands ON categories.brand_id = brands.id`

// base query to append on
const orderBy = "log_time DESC"

/**
 * get a list of categories
 * @param {*} limit maximum amount of results returned
 * @param {*} offset offset of results
 * @returns Array of results or undefined upon error/ null if no categories were found
 */
async function getLogs(limit, offset) {
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

async function updateProductAction(user, product, oldProduct) {
  const { id, quantity, old_quantity, name, weight } = product;
  let action_type = "";
  let query = "";
  if (name != oldProduct.name) {
    action_type = "עדכון שם";
    query = "INSERT INTO logs(user_id, product_id, action_type, new_value, old_value) VALUES((SELECT id FROM users WHERE username = $1), $2, $3, $4, $5);";
    let nameResults = await db.queryDB(query, [user, id, action_type, name, oldProduct.name]);
  }
  if (quantity != oldProduct.quantity) {
    action_type = "עדכון כמות";
    query = "INSERT INTO logs(user_id, product_id, action_type, new_value, old_value) VALUES((SELECT id FROM users WHERE username = $1), $2, $3, $4, $5);";
    let quantityResults = await db.queryDB(query, [user, id, action_type, quantity, old_quantity]);
  }
  if (weight != oldProduct.weight) {
    action_type = "עדכון משקל";
    query = "INSERT INTO logs(user_id, product_id, action_type, new_value, old_value) VALUES((SELECT id FROM users WHERE username = $1), $2, $3, $4, $5);";
    let weightResults = await db.queryDB(query, [user, id, action_type, weight, oldProduct.weight]);
  }
  return product;
}

async function createProductAction(user, log, id) {
  const { quantity } = log
  const action_type = "הוספת מוצר"
  let query = "INSERT INTO logs(user_id, product_id, action_type, new_value, old_value) VALUES((SELECT id FROM users WHERE username = $1), $2, $3, $4, $5);"
  let results = await db.queryDB(query, [user, id, action_type, quantity, 0]);
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
  getLogs,
  updateProductAction,
  createProductAction
}
