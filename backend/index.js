const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const postRoute = require('./routes/post.routes')

const port = process.env.port || 4000

mongoose
  .connect("mongodb+srv://ndross427:RTvuH2nbonoV7Fjn@blog-app.numnxm7.mongodb.net/Blog-App")
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err.reason);
  })


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended : true
}))
app.use("/posts", postRoute)
app.use((req, res, next) => {
  next(createError(404))
})
app.use((err, req, res, next) => {
  if(!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message)
})


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})


