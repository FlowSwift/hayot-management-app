"use strict";
const express = require("express");
const db = require("../db/queries")
const brandsQuery = require("../db/brands")
const util = require("./util")

let router = express.Router();

// fetch all brands. add limit and offset url queries params for pagination otherwise default would apply
router.get('/brands', async (req, res) => {
    // request handling
    let results = await brandsQuery.getBrands(req.query.limit, req.query.offset)
    //response handling
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})

/**
 * fetch brands by name
 * use strict query paramater for substring search //false by default
 * add limit and offset url queries params for pagination otherwise default would apply
 */
router.get('/brands/name/:name', async (req, res) => {
    // handle strict flag
    let strict = false
    let queryStrict = req.query.strict
    if (queryStrict !== undefined) {
        switch (queryStrict) {
            case "true":
                strict = true
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
        results = await brandsQuery.getBrandByName(req.params.name)
    }
    else {
        results = await brandsQuery.getBrandsBySubstring(req.params.name, req.query.limit, req.query.offset)
    }
    //response handling
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})

// Create new brand
router.post('/brands', async (req, res) => {
    // request handling
    let results = await brandsQuery.createBrand(req.body)
    //response handling
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})

module.exports = router;

// update brands by id
router.put('/brands', async (req, res) => {
    // request handling
    let results = await brandsQuery.updateBrandByID(req.body)
    //response handling
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})

module.exports = router;