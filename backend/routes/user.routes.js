const express = require('express')
const router = express.Router()

const userSchema = require('../models/User')

/* ----------------- Send username and password through form ---------------- */


router.post("/create", async (req, res, next) => {
    const { username, password } = req.body;
    const appId = "501dfdb9-3711-4e49-a180-1ff480b22a43";



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

    if (data) {
        await userSchema
            .create({
                username: username,
                admin: false
            })
            .catch(err => {
                return next(err)
            })
    }

    res.json(data);
});


/* ----------------- Send username and password through form ---------------- */

router.post("/verify", async (req, res) => {
    const { username, password } = req.body;
    const appId = "501dfdb9-3711-4e49-a180-1ff480b22a43";

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
                ...user,
                message: `User ${user.name} found`,
                status: 200
            })
        })
        .catch(err => {
            return next(err)
        })
})

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
