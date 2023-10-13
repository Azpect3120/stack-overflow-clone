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
  await studentSchema
    .findById(req.params.id)
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

/* --------------------------- Edit post with _id --------------------------- */

router.post("/edit-post/:id", async (req, res, next) => {
  await postSchema
    .findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
      console.log(result)
      res.json({
        data: result, 
        message: "Data successfully updated",
      })
    })
    .catch(err => {
      return next(err)
    })
  }
)

/* -------------------------- Delete post with _id -------------------------- */

router.delete("/delete-post/:id", async (req, res, next) => {
  await postSchema
  .findByIdAndRemove(req.params.id)
  .then(() => {
    res.json({
      message: "Post Successfully Deleted",
    })
  })
  .catch(err => {
    return next(err)
  })
})

module.exports = router

