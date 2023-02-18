const express = require('express')
const app = express()
const port = 5000

const { Pool, Client } = require('pg')
 
// const client = new Client({
//   user: process.env.POSTGRES_USER,
//   host: process.env.POSTGRES_DB,
//   database: process.env.POSTGRES_DB,
//   password: process.env.POSTGRES_PASSWORD,
//   port: process.env.POSTGRES_PORT,
// })

const client = new Client({
  user: "postgres",
  host: "postgres://postgres/db",
  database: "products",
  password: "docker",
  port: "5432",
})

console.log("LALALA" + process.env.POSTGRES_HOST)

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})