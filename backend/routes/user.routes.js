const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary')

const { getUserWithID } = require("./routeMethods.js")

const userSchema = require('../models/User')

const appId = "501dfdb9-3711-4e49-a180-1ff480b22a43"

/* ------------------------------ Get all users ----------------------------- */

router.get("/", async (req, res, next) => {
  const userID = req.query.userID
  let user

  if (!userID) {
    user = {username: "newUser", id: "", admin: false}
  } else {

    user = await getUserWithID(res, userID)
  }

  try {
    await userSchema
      .find()
      .then(users => {
        if (!user.admin) {
          const usernames = users.map((user) => user.username);
  
          res.status(200).json({
            users: usernames,
            message: `All ${usernames.length} users found`,
            userCount: usernames.length,
            status: 200,
          });
        } else {
          // If the user is an admin, include all user data in the response
          res.status(200).json({
            users: users,
            message: `All ${users.length} users found`,
            userCount: users.length,
            status: 200,
          });
        }
      })
  } catch (err) {
    return next(err)
  }
})

/* ----------------- Send username and password through form ---------------- */

router.post("/create", async (req, res, next) => {
  const {username, password, email} = req.body
  const regex = new RegExp(email, 'i')

  try {
    const emailCheck = await userSchema.find({email: {$regex: regex}})

    if (emailCheck.length > 0) {
      res.status(409).json({
        message: `Email ${email} is already in use`
      })
      return false
    }

    const response = await fetch("http://54.176.161.136:8080/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        applicationId: appId, 
        username: username, 
        password: password, 
        data: "{}"
      })
    })
  
    const data = await response.json()
    
    if (data.status === 201) {
      await userSchema.create({
        username: username, 
        userAuthID: data.user.ID, 
        admin: false,
        email: email,
        data: data.data,
        avatar: ""
      })
      res.status(201).json(data)
      return true
    }
    res.status(500).json({
      message: `Something went wrong`
    })
  } catch(err) {
    next(err)
  }
})

/* ------------------------------- Delete user ------------------------------ */

router.post("/delete/:userAuthID", async (req, res, next) => {
  const userAuthID = req.params.userAuthID
  const userID = req.query.userID

  let user = await getUserWithID(res, userID)

  if (!user.admin) {
    res.status(403).json({
      message: `User ${user.username} not allowed to delete users`
    })
  }

  try {
    const response = await fetch("http://54.176.161.136:8080/users/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        applicationId: appId, 
        ID: userAuthID
      })
    })

    const data = await response.json()

    if (data.status === 200) {
      await userSchema.deleteOne({userAuthID: userAuthID})
      res.status(200).json(data)
    } else {
      res.status(500).json({
        data,
        message: `Something went wrong`
      })
    }
  } catch(err) {
    next(err)
  }
})

/* ----------------- Send username and password through form ---------------- */

router.post("/verify", async (req, res, next) => {
  const {username, password} = req.body
  try {
    const response = await fetch("http://54.176.161.136:8080/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        applicationId: appId, 
        username: username, 
        password: password
      })
    })
    const data = await response.json()

    res.json(data)
  } catch(err) {
    next(err)
  }
})

/* ----------------------- Get users profile with name ---------------------- */

router.get("/profile/:name", async (req, res, next) => {
  const name = req.params.name
  const userID = req.query.userID
  let request

  if (!userID) {
    request = { username: "", id: "", admin: false} 
  } else {
    request = await getUserWithID(res, userID)
  }

  try {

    await userSchema
      .findOne({username: name})
      .then(user => {
        if (!user) return res.status(404).send(`No user found with the username ${name}`)
        
        const { username, admin, avatar, createdAt } = user

        if (request.username === name || request.admin) {
          res.status(200).json({
            user,
            message: `User ${user.username} found`, 
          })
        } else {
          res.status(200).json({
            user: {
              username,
              admin, 
              avatar, 
              createdAt,
            },
            message: `User ${user.username} found`, 
          })
        }
      }) 
  } catch(err) {
    return next(err)
  }
})

/* --------------------------- Update users avatar -------------------------- */

router.post("/update-avatar", async (req, res, next) => {
  const { username, url } = req.body;

  try {
    const user = await userSchema.findOne({ username })

    if (user.avatar) {
      const publicId = user.avatar.split('/').pop().split('.')[0];
      cloudinary.v2.api
        .delete_resources([`Avatars/${publicId}`], 
          { type: 'upload', resource_type: 'image' })
        .then(console.log);
    }

    await userSchema.findOneAndUpdate({ username }, { avatar: url }, { new: true })

    res.status(201).json({
      message: `${username}'s avatar was updated.`,
      status: 201
    });
  } catch (err) {
    return next(err);
  }
});

/* -------------------- Update users profile information -------------------- */

router.post("/update-profile/:name", async (req, res, next) => {
  const name = req.params.name
  const userID = req.query.userID

  const user = await getUserWithID(res, userID)

  try {

    if (name !== user.username && !user.admin) {
      res.status(403).json({
        message: `User ${name}, not able to edit ${user.username}'s profile`
      })
      return false
    }

    await userSchema
      .findOneAndUpdate({username: name}, req.body)
      .then(result => {
        if (!result) return res.status(404).send(`No user found with the username ${user.username}`)
        
        res.json({
          message: `User ${result.username} found and updated`, 
          status: 200
        })
      }) 
  } catch (err) {
    return next(err)
  }
})

/* ----------------------- Set an account to be admin ----------------------- */

router.post("/make-admin/:id", async (req, res, next) => {
  const id = req.params.id
  const admin = req.query.admin === "true"
  const userID = req.query.userID

  const adminAccess = admin ? true : false

  let user = await getUserWithID(res, userID)

  if (!user.admin) {
    res.status(403).json({
      message: `User with id: ${userID} not allowed to promote users`
    })
    return false
  }

  try {
    await userSchema
      .findByIdAndUpdate(id, {admin: adminAccess})
      .then(user => {
        if (!user) return res.status(404).send(`No user found with the _id: ${id}`)
    
        res.json({
          name: user.username, 
          id: user._id, 
          message: `User ${user.username} found and given admin`, 
          status: 200
        })
      }) 
  } catch (err) {
    return next(err)
  }
})

module.exports = router
