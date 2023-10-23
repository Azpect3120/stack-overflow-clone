const express = require('express')
const router = express.Router()

let postSchema = require("../models/Post.js")
let commentSchema = require("../models/Comment.js")

// All comments start with /comments

/* -------------------------- Check if post exists -------------------------- */

async function isValid_id(res, id, schema) {
  try {
    const post = await schema.findById(id)
    if (!post) throw new Error(`Post with _id: ${id} not found`)
    return true
  }
  catch(error) {
    res.status(404)
    res.json({
      id: id,
      message: error.message,
      status: 404
    })
    return false
  }
}

/* ---------------------------- Get all Comments ---------------------------- */

router.get("/:id", async (req, res, next) => {
  const postID = req.params.id

  if (!await isValid_id(res, postID, postSchema)) return false
  
  await commentSchema
    .find({
      postID: postID
    })
    .then((result) => {
      res.json({
        data: result.reverse(),
        message: "Comments successfully fetched",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
  })

/* ------------------------------ Make comment ------------------------------ */

router.post("/create/:id", async (req, res, next) => {
  const postID = req.params.id

  if (!await isValid_id(res, postID, postSchema)) return false
  
  await commentSchema
    .create({
      ...req.body,
      postID: postID
    })
    .then(() => {
      res.json({
        message: "Comment successfully created",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
  })

/* ------------------------------ Edit comment ------------------------------ */

router.post("/edit/:id", async (req, res, next) => {
  const commentID = req.params.id

  if (!await isValid_id(res, commentID, commentSchema)) return false
  
  await commentSchema
    .findByIdAndUpdate(commentID, req.body)
    .then(() => {
      res.json({
        message: "Comment updated successfully",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
  })

/* ----------------------------- Delete comment ----------------------------- */

router.post("/delete/:id", async (req, res, next) => {
  const commentID = req.params.id

  if (!await isValid_id(res, commentID, commentSchema)) return false
  
  await commentSchema
    .findByIdAndDelete(commentID)
    .then(() => {
      res.json({
        message: "Comment successfully Deleted",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
  })

/* -------------------------------------------------------------------------- */
  
module.exports = router