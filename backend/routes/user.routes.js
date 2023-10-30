const express = require('express')
const router = express.Router()

const userSchema = require('../models/User')

const appId = "501dfdb9-3711-4e49-a180-1ff480b22a43";

/* ------------------------------ Get all users ----------------------------- */

router.get("/", async (req, res, next) => {
    await userSchema
        .find()
        .then(user => {
            res.json({
                ...user,
                message: `All ${user.length} users found`,
                userCount: user.length,
                status: 200
            })
        })
        .catch(err => {
            return next(err)
        })
})

/* ----------------- Send username and password through form ---------------- */

router.post("/create", async (req, res, next) => {
    const { username, password } = req.body;

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
    });
    
    const data = await response.json();

    console.log(data)

    //! Fix these conditions to check if data works
    if (data) {
        await userSchema
            .create({
                username: username,
                userAuthID: data.user.ID,
                admin: false
            })
            .catch(err => {
                return next(err)
            })
    }

    res.json(data);
});

/* ------------------------------- Delete user ------------------------------ */

router.post("/delete/:userAuthID", async (req, res, next) => {
    const userAuthID = req.params.userAuthID

    const response = await fetch("http://54.176.161.136:8080/users/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            applicationId: appId,
            ID: userAuthID
        })
    });

    const data = await response.json();

    //! Fix these conditions to check if data works
    if (data) {
        await userSchema
        .deleteOne({
            userAuthID: userAuthID
        })
        .catch(err => {
            return next(err)
        })
    }

    res.json(data);
})


/* ----------------- Send username and password through form ---------------- */

router.post("/verify", async (req, res) => {
    const { username, password } = req.body;

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
    });
    
    const data = await response.json();

    res.json(data);
});

/* ----------------------- Get users profile with name ---------------------- */

router.get("/profile/:name", async (req, res, next) => {
    const name = req.params.name;
    await userSchema
        .findOne({ username: name })
        .then(user => {
            if (!user) return res.status(404).send(`No user found with the username ${name}`);
            res.json({
                username: user.username,
                admin: user.admin,
                message: `User ${user.name} found`,
                status: 200
            })
        })
        .catch(err => {
            return next(err)
        })
})

/* -------------------- Update users profile information -------------------- */

//! WORK IN PROGRESS, UPDATING DOES NOT CURRENT CHANGE INFORMATION
router.post("/update-profile/:name", async (req, res, next) => {
    const name = req.params.name;
    const userRequest = req.body.username

    if (name !== userRequest) {
        return res.status(403).send(`You do not have permission to edit this users profile`)
    }

    await userSchema
        .findOneAndUpdate({ username: name }, req.body)
        .then(user => {
            if (!user) return res.status(404).send(`No user found with the username ${name}`);
            res.json({
                username: user.username,
                admin: user.admin,
                message: `User ${user.name} found`,
                status: 200
            })
        })
        .catch(err => {
            return next(err)
        })
})

/* -------------------------- Make a user an admin -------------------------- */

router.post("/make-admin/:id", async (req, res, next) => {
    const id = req.params.id;

    await userSchema
        .findByIdAndUpdate(id, {
            admin: true
        })
        .then(user => {
            if (!user) return res.status(404).send(`No user found with the _id: ${id}`);
            res.json({
                name: user.username,
                id: user._id,
                message: `User ${user.username} found and made admin`,
                status: 200
            })
        })
        .catch(err => {
            return next(err)
        })
})

/* --------------------------- Check admin status --------------------------- */

router.get("/is-admin/:name", async (req, res, next) => {
    const name = req.params.name

    await userSchema
        .findOne({
            username: name
        })
        .then(user => {
            if (!user) return res.status(404).send(`No user found with the username ${name}`);
            res.json({
                isAdmin: user.admin,
                id: user._id,
                message: `User ${user.username} found`,
                status: 200
            })
        })
})



module.exports = router
