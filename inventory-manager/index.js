const express = require('express')
const app = express()
const port = 5000

const db = require("./db/queries")

app.get('/', async (req, res) => {
  try {
    results = await db.query("SELECT * FROM brands")
    res.send(results.rows)
  } catch (error) {
    console.error(`ERROR: ${error}`)
    res.status(500).send("Error")
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    results = await db.query("SELECT * FROM brands")
    res.send(results.rows)
  } catch (error) {
    console.error(`ERROR: ${error}`)
    res.status(500).send("Error")
  }
})

app.get('/products/name/:name', async (req, res) => {
  try {
    console.log(req.params)
    results = await db.query(`SELECT * FROM products WHERE name= '$1'`, [req.params.name])
    res.send(results.rows)
  } catch (error) {
    console.error(`ERROR: ${error}`)
    res.status(500).send("Error")
  }
})

app.get('/products/:name', async (req, res) => {
  try {
    results = await db.query("SELECT * FROM brands")
    res.send(results.rows)
  } catch (error) {
    console.error(`ERROR: ${error}`)
    res.status(500).send("Error")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})