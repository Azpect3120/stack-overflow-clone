const voteSchema = require('../models/Vote')
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
    const existingVote = await voteSchema.findOne({
      author: author,
      targetID: id
    });

    if (existingVote) {
      await voteSchema.findByIdAndUpdate(existingVote._id, req.body);

      res.status(200).json({
        id: id,
        message: `Updated ${author}'s vote on ${id}`
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

module.exports = { countVotes, isValid_id, isDuplicate, getUserWithID }