const express = require('express')
const router = express.Router()


let postSchema = require("../models/Post.js")

/* -------------------------- Check if post exists -------------------------- */

async function checkPost_id(id) {
  const post = await postSchema.findById(id)
  if (!post) throw new Error(`Post with _id: ${id} not found`)
  return true
}

async function isValid_id(res, id) {
  try {
    await checkPost_id(id)
    return true
  }
  catch(error) {
    res.status(404)
    res.json({
      id: id,
      message: `Post with _id: ${id} does not exist`,
      status: 404
    })
    return false
  }
}

/* -------------------------- Create post from form ------------------------- */

router.post("/create-post", async (req, res, next) => {
  await postSchema
    .create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully uploaded",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
})

/* --------------------------- Get a post with _id -------------------------- */

router.get("/get-post/:id", async (req, res, next) => {
  if (!await isValid_id(res, req.params.id)) return false
  
  await postSchema
    .findById(req.params.id)
    .then((result) => {
      res.json({
        data: result,
        message: "Post successfully fetched",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
})

/* --------------------------- Edit post with _id --------------------------- */

router.post("/edit-post/:id", async (req, res, next) => {
  if (!await isValid_id(res, req.params.id)) return false

  await postSchema  
    .findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
      console.log(result)
      res.json({
        data: result, 
        message: "Data successfully updated",
        status: 200
      })
    })
    .catch(err => {
      return next(err)
    })
  }
)

/* -------------------------- Delete post with _id -------------------------- */

router.delete("/delete-post/:id", async (req, res, next) => {
  if (!await isValid_id(res, req.params.id)) return false
  
  await postSchema
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Post _id: ${req.params.id} Successfully Deleted`,
      })
    })
    .catch(err => {
      return next(err)
    })
})

module.exports = router