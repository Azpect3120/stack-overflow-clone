const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary')
const filter = require('leo-profanity');


const { isValid_id, getUserWithID } = require("./routeMethods.js")

/* ----------------------------- MongoDB schemas ---------------------------- */

let postSchema = require("../models/Post.js")
let commentSchema = require("../models/Comment.js")
let voteSchema = require("../models/Vote.js")

// All posts start with /posts

/* ------------------------------ Get all posts ----------------------------- */

router.get("/", async (req, res, next) => {
  try {
    await postSchema
    .find()
    .then((result) => {
      res.status(200).json({
        data: result.reverse(),
        message: "Posts successfully fetched",
        status: 200,
      })
    })
  } catch(err) {
    return next(err)
  }
})

/* ------------------------ Get all of a users posts ------------------------ */

router.get("/user/:username", async (req, res, next) => {
  const username = req.params.username;
  try {
    await postSchema
      .find({author: username})
      .then(result => {
        res.status(200).json({
          data: result.reverse(),
          message: `${username}'s posts successfully fetched`,
          status: 200
        })
      })

  } catch (err) {
    next(err)
  }
});

/* ------------------- Search posts with title and content ------------------ */

router.get("/search", async (req, res, next) => {
  let query = req.query.query
  const regex = new RegExp(query, 'i')
  try {
    await postSchema
      .find({
        $or: [
          { title: { $regex: regex } },
          { content: { $regex: regex } },
          { author: { $regex: regex } }
        ]
      })
      .then((result) => {
        let message = result.length == 0 ? `No posts found from search` : `Posts successfully fetched`

        res.status(200).json({
          data: result.reverse(),
          count: result.length,
          message: message,
          status: 200,
        })
      })
  } catch(err) {
    return next(err)
  }
})

/* -------------------------- Create post from form ------------------------- */

router.post("/create-post", async (req, res, next) => {
  try {
    req.body.content = filter.clean(req.body.content);
    req.body.title = filter.clean(req.body.title);
    const result = await postSchema.create(req.body);
    res.status(201).json({
      data: result,
      message: "Data successfully uploaded",
      status: 200,
    })
  } catch (err) {
    return next(err)
  }
})

/* --------------------------- Get a post with _id -------------------------- */

router.get("/get-post/:id", async (req, res, next) => {
  const postID = req.params.id

  if (!await isValid_id(res, postID, postSchema)) return false
  
  try {
    await postSchema
    .findById(postID)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Post successfully fetched",
        status: 200,
      })
    })
  } catch(err) {
      return next(err)
  }
})

/* --------------------------- Edit post with _id --------------------------- */

router.post("/edit-post/:id", async (req, res, next) => {
  const postID = req.params.id
  const userID = req.query.userID

  const user = await getUserWithID(res, userID)

  if (!await isValid_id(res, postID, postSchema)) return false

  try {
    const post = await postSchema.findById(postID);
    
    if (user.username !== post.author && !user.admin) {
      res.status(403).json({
        message: `User ${user.username} not authorized to edit ${post.author}'s post`
      })
      return false
    }

    req.body.content = filter.clean(req.body.content);
    req.body.title = filter.clean(req.body.title);

    await postSchema  
    .findByIdAndUpdate(postID, req.body)
    .then(result => {
      console.log(result)
      res.json({
        data: result, 
        message: "Data successfully updated",
        status: 200
      })
    })
  } catch(err) {
    return next(err)
  }
})

/* -------------------------- Delete post with _id -------------------------- */

router.post("/delete-post/:id", async (req, res, next) => {
  const postID = req.params.id
  const userID = req.query.userID

  const user = await getUserWithID(res, userID)

  if (!await isValid_id(res, postID, postSchema)) return false
  
  try {
    const post = await postSchema.findById(postID)

    if (user.username !== post.author && !user.admin) {
      res.status(403).json({
        message: `User ${user.username} not authorized to delete ${post.author}'s post`
      })
      return false
    }

    const deletePromises = [
      postSchema.findByIdAndRemove(postID),
      commentSchema.deleteMany({ postID: postID }),
      voteSchema.deleteMany({ targetID: postID }),
    ]
    
    if (post.imageUrl) {
      const publicId = post.imageUrl.split('/').pop().split('.')[0]
      await cloudinary.v2.api.delete_resources(
        [`BlogImages/${publicId}`], 
        { type: 'upload', resource_type: 'image' }
      )
    }
    
    await Promise.all(deletePromises)

    res.status(200).json({
      message: `All info related to post: ${postID} has been deleted`,
    })
  } catch (err) {
    return next(err)
  }
})

/* -------------------------------------------------------------------------- */

module.exports = router
