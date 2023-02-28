"use strict";
const express = require("express");
const db = require("../db/queries")
const productsQuery = require("../db/products")


let router = express.Router();

function setStatus (results, res) {
    let status = 200
    if (results === undefined) {
        status = 500
    }
    else if(results === null) {
        status = 404
    }
    return res.status(status)
}

function sendStatusMessage (res) {
    let status = res.statusCode
    switch (status) {
        case 404:
            res.send("Product not found")
            break;
        case 500:
            res.send("Internal server error")
            break;
        default:
            res.send(`Unkown error. Status: ${status}`)
            break;
    }
}
// fetch all products. NOTE pagination need to be added
router.get('/products', async (req, res) => {
    let results = await db.queryDB("SELECT * FROM products")
    if (results === undefined) {
        return res.status(500).send("Error")
    }
    res.send(results.rows)
})

// fetch a product by ID
router.get('/products/:id', async (req, res) => {
    let product
    // parameter check
    let id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(404)
    }
    // request handling
    product = await productsQuery.getProductByID([id])
    // response handling
    setStatus(product, res)
    if (res.statusCode != 200) {
        return sendStatusMessage(res)
    }
    return res.send(product)
})

router.get('/products/name/:name', async (req, res) => {
    try {
        let results = await db.queryDB("SELECT * FROM products WHERE name = $1", [req.params.name])
        res.send(results.rows)
    } catch (error) {
        console.error(`ERROR: ${error}`)
        res.status(500).send("Error")
    }
})

router.get('/products/ean/:ean', async (req, res) => {
    try {
        let results = await db.queryDB("SELECT * FROM products WHERE ean = $1", [req.params.ean])
        res.send(results.rows)
    } catch (error) {
        console.error(`ERROR: ${error}`)
        res.status(500).send("Error")
    }
})

// Error handler
router.use(function (err, req, res, next) {

    if (err) {
        console.log(`ERROR: ${err}`)
        res.status(600).send(err);
    }

});

module.exports = router;