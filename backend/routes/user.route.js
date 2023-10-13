const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()


let userSchema = require("../models/User.js")
/* ------------------------------- User routes ------------------------------ */
router.route("/create-user").post(async (req, res, next) => {
  await userSchema
    .create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "User successfully uploaded",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
})

router.route("/get-user/:id").get(async (req, res, next) => {
  await userSchema
    .findById(req.params.id)
    .then((result) => {
      res.json({
        data: result,
        message: "User successfully fetched",
        status: 200,
      })
    })
    .catch(err => {
      return next(err)
    })
})


router.route("/edit-user/:id").put(async (req, res, next) => {
  await userSchema
    .findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
      console.log(result)
      res.json({
        data: result, 
        message: "User successfully updated",
      })
    })
    .catch(err => {
      return next(err)
    })
})

router.route("/delete-user/:id").delete(async (req, res, next) => {
  await userSchema
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: "User Successfully Deleted",
      })
    })
    .catch(err => {
      return next(err)
    })
})

module.exports = router

