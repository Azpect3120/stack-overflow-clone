const express = require('express')
const router = express.Router()

let postSchema = require("../models/Post.js")
let commentSchema = require("../models/Comment.js")
let voteSchema = require('../models/Vote.js')

/* ------------------------------- Count votes ------------------------------ */

function countVotes(data) {
  let trueVotes = 0;
  let falseVotes = 0;

  for (const item of data) {
    if (item.vote === true) {
      trueVotes++;
    } else if (item.vote === false) {
      falseVotes++;
    }
  }

  return trueVotes - falseVotes;
}

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

/* ---------------------------- Post vote on post --------------------------- */

router.post("/post/:id", async (req, res, next) => {
  const postID = req.params.id

  if (!await isValid_id(res, postID, postSchema)) return false
  
  await voteSchema
    .create({
      ...req.body,
      targetID: postID
    })
    .then((result) => {
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
  
  await voteSchema
    .create({
      ...req.body,
      targetID: commentID
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

  if (!await isValid_id(res, targetID, postSchema) && !await isValid_id(res, targetID, commentSchema) ) return false
  
  await voteSchema
    .find({
      targetID: targetID
    })
    .then(result => {
      res.json({
        data: result,
        voteCount: countVotes(result),
        message: "All votes successfully fetched",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
  })

/* -------------------------------------------------------------------------- */
  
module.exports = router