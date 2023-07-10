"use strict";
const { query } = require("express");
const db = require("../db/queries");

/**
 * Creates a new user account in the database with the given username and password.
 * @param {string} username - The username for the new account.
 * @param {string} password - The password for the new account.
 * @returns - results object or undefined upon user creation error
 */
async function createAccount(username, password) {
    let query = 'INSERT INTO users (username, password) VALUES ($1, $2)'
    let results = await db.queryDB(query, [username, password]);
    if (results === undefined) {
        return undefined
    }
    return results
}

/**
 * Fetch account username and password(hashed) from the DB
 * @param {string} username - Username of the account to fetch.
 * @returns - result object if account was found or undefined if no account was found
 */
async function getAccount(username) {
    let query = 'SELECT username, password FROM users WHERE username = $1'
    let result = await db.queryDB(query, [username]);
    if (result.rowCount < 1) {
        result = undefined;
    }
    return result
}


module.exports = {
    createAccount,
    getAccount
}