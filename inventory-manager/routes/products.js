"use strict";
const express = require("express");
const db = require("../db/queries")

let router = express.Router();


router.get('/products', async (req, res) => {
    res.send("aaaa")
})

router.get('/products/:id', async (req, res) => {
    try {
        let results = await db.query("SELECT * FROM products WHERE id = $1", [req.params.id])
        res.send(results.rows)
    } catch (error) {
        console.error(`ERROR: ${error}`)
        res.status(500).send("Error")
    }
})

router.get('/products/name/:name', async (req, res) => {
    try {
        let results = await db.query("SELECT * FROM products WHERE name = $1", [req.params.name])
        res.send(results.rows)
    } catch (error) {
        console.error(`ERROR: ${error}`)
        res.status(500).send("Error")
    }
})

router.get('/products/ean/:ean', async (req, res) => {
    try {
        let results = await db.query("SELECT * FROM products WHERE ean = $1", [req.params.ean])
        res.send(results.rows)
    } catch (error) {
        console.error(`ERROR: ${error}`)
        res.status(500).send("Error")
    }
})

module.exports = router;