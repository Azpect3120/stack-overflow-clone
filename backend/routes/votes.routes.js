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

/* ------------------------ check for duplicate vote ------------------------ */

async function isDuplicate(req, res, id, author) {
  try {
    const existingVote = await voteSchema.findOne({
      author: author,
      targetID: id
    });

    if (existingVote) {
      await voteSchema.findByIdAndUpdate(existingVote._id, req.body);

      res.status(200).json({
        id: id,
        message: `Updated ${author}'s vote on ${id}`,
        status: 200
      });

      return true
    }

    return false
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
}

/* -------------------------- Check if post exists -------------------------- */

async function isValid_id(res, id, schema) {
  try {
    const post = await schema.findById(id);
    if (!post) throw new Error(`Post with _id: ${id} not found`);
    return true;
  } 
  catch (error) {
    res.json({
      id: id,
      message: error.message,
      status: 404
    });
    return false;
  }
}


/* ---------------------------- Post vote on post --------------------------- */

router.post("/post/:id", async (req, res, next) => {
  const postID = req.params.id

  if (!await isValid_id(res, postID, postSchema)) return false
  if (await isDuplicate(req, res, postID, "Username")) return true

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
  if (await isDuplicate(req, res, postID, "Username")) return true

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

/*   let post = !!await isValid_id(res, targetID, postSchema)
  let comment = !!await isValid_id(res, targetID, commentSchema)
  console.log(
  comment, 
  post) */

  await voteSchema
    .find({
      targetID: targetID
    })
    .then(votes => {
      let message = votes.length == 0 ? `No votes found for this item` : `All votes successfully fetched`
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