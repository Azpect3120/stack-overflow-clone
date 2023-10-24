const express = require('express')
const router = express.Router()

let { isValid_id } = require("./routeMethods.js")
let postSchema = require("../models/Post.js")
let commentSchema = require("../models/Comment.js")

// All posts start with /post

/* ------------------------------ Get all posts ----------------------------- */

router.get("/", async (req, res, next) => {
  await postSchema
    .find()
    .then((result) => {
      res.json({
        data: result.reverse(),
        message: "Posts successfully fetched",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
})

/* ------------------- Search posts with title and content ------------------ */

router.get("/search", async (req, res, next) => {
  let query = req.query.query
  const regex = new RegExp(query, 'i');

  await postSchema
    .find({
      $or: [
        { title: { $regex: regex } },
        { content: { $regex: regex } },
        { author: { $regex: regex } }
      ]
    })
    .then((result) => {
      let message = result.length == 0 ? `No posts found from search` : `Posts successfully fetched`

      res.json({
        data: result,
        count: result.length,
        message: message,
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
})

/* -------------------------- Create post from form ------------------------- */

router.post("/create-post", async (req, res, next) => {
  await postSchema
    .create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully uploaded",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
})

/* --------------------------- Get a post with _id -------------------------- */

router.get("/get-post/:id", async (req, res, next) => {
  const postID = req.params.id

  if (!await isValid_id(res, postID, postSchema)) return false
  
  await postSchema
    .findById(req.params.id)
    .then((result) => {
      res.json({
        data: result,
        message: "Post successfully fetched",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
})

/* --------------------------- Edit post with _id --------------------------- */

router.post("/edit-post/:id", async (req, res, next) => {
  const postID = req.params.id

  if (!await isValid_id(res, postID, postSchema)) return false

  await postSchema  
    .findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
      console.log(result)
      res.json({
        data: result, 
        message: "Data successfully updated",
        status: 200
      })
    })
    .catch(err => {
      return next(err)
    })
  }
)

/* -------------------------- Delete post with _id -------------------------- */

router.post("/delete-post/:id", async (req, res, next) => {
  const postID = req.params.id

  if (!await isValid_id(res, postID, postSchema)) return false
  
  await postSchema
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Post _id: ${req.params.id} Successfully Deleted`,
      })
    })
    .catch(err => {
      return next(err)
    })

  await commentSchema
    .deleteMany({
      postID: postID
    })
    .then(() => {
      res.json({
        message: `Comments under Post _id: ${postID} Successfully Deleted`,
      })
    })
    .catch(err => {
      return next(err)
    })
})

/* -------------------------------------------------------------------------- */

module.exports = router