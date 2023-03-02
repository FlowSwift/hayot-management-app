"use strict";

/**
 * change res status code based on query results
 * @param {*} res - http request res object
 * @param {*} results - query object
 */
function setStatus (res, results) {
    let status = 200
    if (results === undefined) {
        status = 500
    }
    else if(results === null) {
        status = 404
    }
    return res.status(status)
}

/**
 * send a status message based on the current res status code
 * @param {*} res - http request res object
 */
function sendStatusMessage (res) {
    let status = res.statusCode
    switch (status) {
        case 404:
            res.send("No results found")
            break;
        case 500:
            res.send("Internal server error")
            break;
        default:
            res.send(`Unkown error. Status: ${status}`)
            break;
    }
}

module.exports = {
    setStatus,
    sendStatusMessage
}