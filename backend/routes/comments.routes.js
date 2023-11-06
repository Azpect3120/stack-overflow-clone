const express = require('express')
const router = express.Router()
const filter = require('leo-profanity');



let { isValid_id, getUserWithID } = require("./routeMethods.js")

/* ----------------------------- MongoDB Schemas ---------------------------- */

let postSchema = require("../models/Post.js")
let commentSchema = require("../models/Comment.js")
let voteSchema = require("../models/Vote.js")

// All comments start with /comments

/* ---------------------------- Get all Comments ---------------------------- */

router.get("/:id", async (req, res, next) => {
  const postID = req.params.id

  if (!await isValid_id(res, postID, postSchema)) return false
  
  try {
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
  } catch(err) {
    return next(err)
  }
})

/* ------------------------------ Make comment ------------------------------ */

router.post("/create/:id", async (req, res, next) => {
  const postID = req.params.id

  if (!await isValid_id(res, postID, postSchema)) return false

  req.body.content = filter.clean(req.body.content);

  try {
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
  } catch(err) {
    return next(err)
  }
})

/* ------------------------------ Edit comment ------------------------------ */

router.post("/edit/:id", async (req, res, next) => {
  const commentID = req.params.id
  const userID = req.query.userID

  const user = await getUserWithID(res, userID)

  if (!await isValid_id(res, commentID, commentSchema)) return false

  try {
    const comment = await commentSchema.findById(commentID)

    if (user.username !== comment.author && !user.admin) {
      res.status(403).json({
        message: `User ${user.username} not authorized to edit ${comment.author}'s comment`
      })
      return false
    }

    req.body.content = filter.clean(req.body.content);

    await commentSchema
    .findByIdAndUpdate(commentID, req.body)
    .then(async content => {
      res.json({
        message: "Comment updated successfully",
        comment: await content,
        status: 200,
      })
    })
  } catch(err) {
    return next(err)
  }
})

/* ----------------------------- Delete comment ----------------------------- */

router.post("/delete/:id", async (req, res, next) => {
  const commentID = req.params.id
  const userID = req.query.userID

  const user = await getUserWithID(res, userID)

  if (!await isValid_id(res, commentID, commentSchema)) return false
  
  try {
    const comment = await commentSchema.findById(commentID)

    if (user.username !== comment.author && !user.admin) {
      res.status(403).json({
        message: 'You do not have permission to delete this comment'
      })
      return false
    }

    const deletePromises = [
      commentSchema.findByIdAndDelete(commentID),
      voteSchema.deleteMany({ targetID: commentID }),
    ]
    
    await Promise.all(deletePromises)

    res.json({
      message: "Comment and votes successfully Deleted",
      status: 200,
    })
  } catch(err) {
    return next(err)
  }
})

/* -------------------------------------------------------------------------- */
  
module.exports = router