const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const axios = require("axios")


/*
    Send username and password through form  
*/
router.post("/create", async(req, res) => {
    const { username, password } = req.body;
    const appId = "501dfdb9-3711-4e49-a180-1ff480b22a43";

    const response = await axios.post("https://authentication-server-lzo6.onrender.com/users/create", {
        applicationID: appId,
        username,
        password
    });

    res.json(response);
});

/*
    Send username and password through form
*/
router.post("/verify", async (req, res) => {
    const { username, password } = req.body;
    const appId = "501dfdb9-3711-4e49-a180-1ff480b22a43";

    const response = await axios.post("https://authentication-server-lzo6.onrender.com/users/verify", {
        applicationID: appId,
        username,
        password
    });

    res.json(response);
});



module.exports = router