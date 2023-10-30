const express = require('express')
const router = express.Router()

let { countVotes, isValid_id, isDuplicate } = require("./routeMethods.js")
let postSchema = require("../models/Post.js")
let commentSchema = require("../models/Comment.js")
let voteSchema = require('../models/Vote.js')

// All votes start with /votes

/* ---------------------------- Post vote on post --------------------------- */

router.post("/post/:id", async (req, res, next) => {
  const postID = req.params.id

  if (!await isValid_id(res, postID, postSchema)) return false
  if (await isDuplicate(req, res, postID, req.body.author)) return true

  await voteSchema
    .create({
      ...req.body,
      targetID: postID,
      type: 'Post'
    })
    .then(() => {
      res.json({
        message: `Vote on post ${postID} successful`,
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
  })

/* -------------------------- Post vote on comment -------------------------- */

router.post("/comment/:id", async (req, res, next) => {
  const commentID = req.params.id

  if (!await isValid_id(res, commentID, commentSchema)) return false
  if (await isDuplicate(req, res, commentID, req.body.author)) return true

  await voteSchema
    .create({
      ...req.body,
      targetID: commentID,
      type: 'Comment'
    })
    .then(() => {
      res.json({
        message: `Vote on comment ${commentID} successful`,
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
  })

/* --------------------- Get votes on post and comments --------------------- */

router.get("/:id", async (req, res, next) => {
  const targetID = req.params.id

  await voteSchema
    .find({
      targetID: targetID
    })
    .then(async votes => {
      let message = votes.length == 0 ? `No votes found for id: ${targetID}` : `All votes successfully fetched`

      res.json({
        data: votes,
        voteCount: countVotes(votes),
        message: message,
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
  })

/* -------------------------------------------------------------------------- */
  
module.exports = router
