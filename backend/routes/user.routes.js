const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const axios = require("axios")
require("dotenv").config()


router.post("/create", async(req, res) => {
    const { username, password } = req.body;
    const appId = process.env.APP_ID;

    const response = await axios.post(process.env.AUTH_URL + "/createUser", {
        applicationID: appId,
        username,
        password
    })

    console.log(response)

})

router.post("/verify", (req, res) => {


})



module.exports = router