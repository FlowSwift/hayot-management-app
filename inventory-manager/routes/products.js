"use strict";
const express = require("express");
const db = require("../db/queries")
const productsQuery = require("../db/products")


let router = express.Router();

// fetch all products. NOTE pagination need to be added
router.get('/products', async (req, res) => {
    try {
        let results = await db.queryDB("SELECT * FROM products")
        res.send(results.rows)
    } catch (error) {
        console.error(`ERROR: ${error}`)
        res.status(500).send("Error")
    }
})


router.get('/products/:id', async (req, res, next) => {
    let results, products
    let id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(404)
    }
    results = await productsQuery.getProductByID([id])
    products = results.rows
    if (products.length == 0) {
        return res.status(404)
    }
    return res.send(products[0])
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