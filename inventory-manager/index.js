"use strict";
const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000

const productsRouter = require("./routes/products")
const brandsRouter = require("./routes/brands")
const categoriesRouter = require("./routes/categories")
const animalsRouter = require("./routes/animals")
const authRouter = require("./routes/auth.js")
const authMiddleware = require("./auth/authMiddleware.js")

const db = require("./db/queries")

// ensure any page can access the API resources
app.use(cors({
  origin: '*'
}));

// delay all routes, use for testing purposes
// app.use((req, res, next) => {
//   const delay = 5000;

//   console.log(`Requested route: ${req.method} ${req.originalUrl}`);
//   console.log('Pausing for 2 seconds...');

//   setTimeout(() => {
//     console.log('Resuming execution.');
//     next();
//   }, delay);
// });
app.use(express.json())
// app.use("/products", authMiddleware)
app.use(productsRouter)
app.use(brandsRouter)
app.use(categoriesRouter)
app.use(animalsRouter)
app.use(authRouter)

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