"use strict";
const express = require("express");
const db = require("../db/queries")
const productsQuery = require("../db/products")
const util = require("./util")

let router = express.Router();


// fetch all products. add limit and offset url queries params for pagination otherwise default would apply
router.get('/products', async (req, res) => {
    // request handling
    let results = await productsQuery.getProducts(req.query.limit, req.query.offset)
    //response handling
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})

// fetch a product by ID
router.get('/products/:id', async (req, res) => {
    let product
    // parameter check
    let id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).send("Bad Request")
    }
    // request handling
    product = await productsQuery.getProductByID(id)
    // response handling
    util.setStatus(res, product)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(product)
})

/**
 * fetch products by name
 * use strict query paramater for substring search //false by default
 * add limit and offset url queries params for pagination otherwise default would apply
 */
router.get('/products/name/:name', async (req, res) => {
    // handle strict flag
    let strict = false;
    const queryStrict = req.query.strict;
    const { brand_id, category_id } = req.query;
    if (queryStrict !== undefined) {
        switch (queryStrict) {
            case "true":
                strict = true;
                break;
            case "false":
                break;
            default:
                return res.status(400).send("illegal strict value")
        }
    }
    // request handling
    let results
    if (strict) {
        results = await productsQuery.getProductByName(req.params.name)
    }
    else {
        results = await productsQuery.getProductsBySubstring(req.params.name, req.query.limit, req.query.offset, category_id, brand_id)
    }
    //response handling
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})

// fetch a product by EAN
router.get('/products/ean/:ean', async (req, res) => {
    // parameter check
    let valid = true
    let results
    let ean = Number(req.params.ean)
    if (isNaN(ean) || ean.toString().length != 13) {
        valid = false
    }
    // request handling
    if (valid) {
        results = await productsQuery.getProductByEAN(ean)
    }
    else {
        results = "invalid"
    }
    //response handling
    if (results == "invalid") {
        return res.status(400).send("Bad Request")
    }
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})

// fetch list of products by brand
router.get('/products/brand/:brand', async (req, res) => {
    // request handling
    let results
    results = await productsQuery.getProductsByBrand(req.params.brand, req.query.limit, req.query.offset)
    //response handling
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})

// fetch list of products by brand
router.get('/products/category/:category', async (req, res) => {
    // request handling
    let results
    results = await productsQuery.getProductsByCategory(req.params.category, req.query.limit, req.query.offset)
    //response handling
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})

// Create new product
router.post('/products', async (req, res) => {
    // request handling
    const user = res.locals.user;
    let results = await productsQuery.createProduct(req.body, user)
    //response handling
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})

// update products by id
router.put('/products', async (req, res) => {
    // request handling
    const user = res.locals.user;
    let results = await productsQuery.updateProductByID(req.body, user);
    //response handling
    util.setStatus(res, results);
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res);
    }
    return res.send(results);
})

module.exports = router;