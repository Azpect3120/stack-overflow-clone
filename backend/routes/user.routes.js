const express = require('express')
const router = express.Router()

/*
    Send username and password through form  
*/

router.post("/create", async (req, res) => {
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
