const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const axios = require("axios")


/*
    Send username and password through form  
*/

async function checkUsername() {
    const appId = "501dfdb9-3711-4e49-a180-1ff480b22a43";

    const response = await fetch("http://54.176.161.136:8080/application/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            applicationId: appId,
            username: username,
            password: password
        })
    });
    console.log(response)

    let userNames = response.username

    return userNames
}




router.post("/create", async (req, res) => {
    const { username, password } = req.body;
    const appId = "501dfdb9-3711-4e49-a180-1ff480b22a43";

    const usersNames = await checkUsername()

    const response = await fetch("http://54.176.161.136:8080/users/create", {
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

/*
    Send username and password through form
*/
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



module.exports = router
