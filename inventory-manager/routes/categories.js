"use strict";
const express = require("express");
const db = require("../db/queries")
const categoriesQuery = require("../db/categories")
const util = require("./util")

let router = express.Router();

// fetch all categories. add limit and offset url queries params for pagination otherwise default would apply
router.get('/categories', async (req, res) => {
    // request handling
    let results = await categoriesQuery.getCategories(req.query.limit, req.query.offset)
    //response handling
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})


// fetch all categories by brand ID. add limit and offset url queries params for pagination otherwise default would apply
// TODO better route path?
router.get('/brands/:brandid/categories', async (req, res) => {
    // request handling
    let brandid = Number(req.params.brandid)
    let results = await categoriesQuery.getCategoriesByBrandId(brandid)
    //response handling
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})


module.exports = router;