const express = require('express')
const router = express.Router()


let postSchema = require("../models/Post.js")

/* 
router.get("/", async (req, res, next) => {
  await studentSchema
    .find()
    .then((result) => {
      res.json({
        data: result,
        message: "All items successfully fetched",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
})
 */

/* -------------------------- Check if post exists -------------------------- */

async function checkPost(id) {
  const post = await postSchema.findById(id)

  if (!post) {
    throw new Error(`Post with _id: ${id} not found`)
  }

  return post
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
  try {
    await checkPost(req.params.id)
  }
  catch(error) {
    res.json({
      message: `Post with _id: ${req.params.id} does not exist`
    })
    return false
  }
  
  await postSchema
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
  try {
    await checkPost(req.params.id)
  }
  catch(error) {
    res.json({
      message: `Post with _id: ${req.params.id} does not exist`
    })
    return false
  }

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
  try {
    await checkPost(req.params.id)
  }
  catch(error) {
    res.json({
      message: `Post with _id: ${req.params.id} does not exist`
    })
    return false
  }
  
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

