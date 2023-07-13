"use strict";
const express = require("express");
const db = require("../db/queries")
const animalsQuery = require("../db/animals")
const util = require("./util")

let router = express.Router();

// fetch all animals. add limit and offset url queries params for pagination otherwise default would apply
router.get('/animals', async (req, res) => {
    // request handling
    let results = await animalsQuery.getAnimals(req.query.limit, req.query.offset)
    //response handling
    util.setStatus(res, results)
    if (res.statusCode != 200) {
        return util.sendStatusMessage(res)
    }
    return res.send(results)
})


module.exports = router;