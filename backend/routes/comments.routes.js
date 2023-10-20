const express = require('express')
const router = express.Router()

let commentSchema = require("../models/Comment.js")

/* -------------------------- Check if post exists -------------------------- */

async function isValid_id(res, id) {
  try {
    const post = await postSchema.findById(id)
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
  if (!await isValid_id(res, postID)) return false
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
  
module.exports = router