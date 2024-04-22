const express = require('express')
require('dotenv').config()
const router = express.Router()

router.get('/newsAPIorg', (req, res) => {
    fetch(`https://newsapi.org/v2/everything?q=keyword&apiKey=${process.env.NEWSapiORG}`)
        .then(response =>response.json())
        .then(data =>{
            console.log(data)
            res.send(data);
        })
        .catch(err =>{
            res.send(err);
        });
});


module.exports = router;