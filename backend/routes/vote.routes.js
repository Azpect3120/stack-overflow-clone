const express = require('express')
const router = express.Router()

let { getUserWithID, countVotes, isValid_id, isDuplicate } = require("./routeMethods.js")

/* ----------------------------- MongoDB Schemas ---------------------------- */

let postSchema = require("../models/Post.js")
let commentSchema = require("../models/Comment.js")

// All votes start with /votes

/* ---------------------------- Post vote on post --------------------------- */

router.post("/post/:id", async (req, res, next) => {
  const postID = req.params.id;
  const userID = req.query.userID

  const { author, vote } = req.body

  if (!await isValid_id(res, postID, postSchema)) return false;
  if (await isDuplicate(req, res, postID, author)) return true;

  const user = await getUserWithID(res, userID)

  try {
    if (!user) {
      res.status(403).json({
        message: "You must be logged in to cast a vote",
        status: 403
      })
      return false
    }

    const newVote = {
      author: author,
      vote: vote,
      date: new Date()
    };

    const updatedPost = await postSchema.findByIdAndUpdate(postID, {
      $push: { votes: newVote }
    }, { new: true }); 

    res.status(200).json({
      message: `Vote on post ${postID} successful`,
      voteCount: countVotes(updatedPost.votes),
      status: 200
    });
  } catch (err) {
    return next(err);
  }
});



/* -------------------------- Post vote on comment -------------------------- */

router.post("/comment/:id", async (req, res, next) => {
  const commentID = req.params.id;
  const userID = req.query.userID

  let { author, vote } = req.body

  if (!await isValid_id(res, commentID, commentSchema)) return false;
  if (await isDuplicate(req, res, commentID, author)) return true;

  const user = await getUserWithID(res, userID)

  try {
    if (!user) {
      res.status(403).json({
        message: "You must be logged in to cast a vote",
        status: 403
      })
      return false
    }

    const newVote = {
      author: author,
      vote: vote,
      date: new Date()
    };

    const originalComment = await commentSchema.findById(commentID);

    const updatedComment = await commentSchema.findByIdAndUpdate(
      commentID,
      { 
        $push: { votes: newVote },
        $set: { voteCount: countVotes([...originalComment.votes, newVote]) }
      },
      { new: true }
    );
    
    const voteCount = updatedComment.voteCount;

    res.status(200).json({
      message: `Vote on comment ${commentID} successful`,
      voteCount: voteCount,
      status: 200
    });
  } catch (err) {
    return next(err);
  }
});


/* -------------------------------------------------------------------------- */
  
module.exports = router
