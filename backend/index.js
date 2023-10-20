const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require("cors")
require("dotenv").config()

const postRoute = require('./routes/post.routes')
const userRoute = require('./routes/user.routes')
const commentRoute = require('./routes/comments.routes')
const voteRoute = require('./routes/votes.routes')

const port = process.env.port || 4000

/* ----------------------------- MongoDB connect ---------------------------- */

const password = process.env.password

mongoose
  .connect(`mongodb+srv://ndross427:${password}@blog-app.numnxm7.mongodb.net/Blog-App`)
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err.reason);
  })


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended : true
}))

/* ------------------------------- App routes ------------------------------- */

app.use("/posts", postRoute)
app.use("/users", userRoute)
app.use("/comments", commentRoute)
app.use("/vote", voteRoute)

/* ----------------------------- Error handling ----------------------------- */

/* app.use((req, res, next) => {
  next(createError(404))
}) */
app.use((err, req, res, next) => {
  if(!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message)
})

/* ------------------------------ Start server ------------------------------ */

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})


