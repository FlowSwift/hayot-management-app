"use strict";
const express = require("express");
const db = require("../db/queries")
const productsQuery = require("../db/products")
const util = require("../helper/util")

let router = express.Router();


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
    util.setStatus(res,product)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res, "Product")
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