const voteSchema = require('../models/Vote')


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

module.exports = { countVotes, isValid_id, isDuplicate }