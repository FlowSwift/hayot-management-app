"use strict";
const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000

const productsRouter = require("./routes/products")

const db = require("./db/queries")

// ensure any page can access the API resources
app.use(cors({
    origin: '*'
}));

app.use(express.json())
app.use(productsRouter)


app.get('/', async (req, res) => {
  try {
    res.send("Index")
  } catch (error) {
    console.error(`ERROR: ${error}`)
    res.status(500).send("Error")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})