/* ----------------------------- MongoDB Schemas ---------------------------- */

// const voteSchema = require('../models/Vote')
const postSchema = require('../models/Post')
const userSchema = require('../models/User')

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
    let { vote } = req.body

    let newVote = {
      author: author,
      vote: vote,
      date: new Date.now()
    }

    const existingVoteInPost = await postSchema.findOne({
      _id: id,
      votes: { $elemMatch: author }
    });

    const existingVoteInComment = await commentSchema.findOne({
      _id: id,
      votes: { $elemMatch: author }
    });

    if (existingVoteInPost) {
      await postSchema.findByIdAndUpdate(id, newVote);
      return true
    } else if (existingVoteInComment) {
      await commentSchema.findByIdAndUpdate(id, newVote);
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
    if (!post) throw new Error;
    return true;
  } 
  catch (error) {
    res.status(404).json({
      id: id,
      message: `Post with _id: ${id} not found`
    });
    return false;
  }
}

/* ---------------------- Get a users auth with authID ---------------------- */

async function getUserWithID(res, userID) {
  try {
    const user = await userSchema.findOne({ userAuthID: userID })
    if (!user) throw new Error
    return user
  }
  catch (error) {
    res.status(404).json({
      userID: userID,
      message: `User with userAuthID: ${userID} not found`
    });
    return false;
  }
}

/* -------------------------------------------------------------------------- */

module.exports = { countVotes, isValid_id, isDuplicate, getUserWithID }