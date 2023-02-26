"use strict";
const express = require('express')
const app = express()
const port = 5000

const db = require("./db/queries")

app.use(express.json())

app.get('/', async (req, res) => {
  try {
    let results = await db.query("SELECT * FROM brands")
    res.send(results.rows)
  } catch (error) {
    console.error(`ERROR: ${error}`)
    res.status(500).send("Error")
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    let results = await db.query("SELECT * FROM brands WHERE id = $1", [req.params.id])
    res.send(results.rows)
  } catch (error) {
    console.error(`ERROR: ${error}`)
    res.status(500).send("Error")
  }
})

app.get('/products/name/:name', async (req, res) => {
  try {
    let results = await db.query("SELECT * FROM products WHERE name = $1", [req.params.name])
    res.send(results.rows)
  } catch (error) {
    console.error(`ERROR: ${error}`)
    res.status(500).send("Error")
  }
})

app.get('/products/ean/:ean', async (req, res) => {
  try {
    let results = await db.query("SELECT * FROM products WHERE ean = $1", [req.params.ean])
    res.send(results.rows)
  } catch (error) {
    console.error(`ERROR: ${error}`)
    res.status(500).send("Error")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})