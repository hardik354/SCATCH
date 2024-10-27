const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");


// creating a owner and i want this will work only for development phase
if (process.env.NODE_ENV === 'development'){
    router.post('/create', async (req, res) => {
        // res.send('hey it is working');
     let owners =   await ownerModel.find();
     if(owners.length > 0)
     {
        return res.status(503).send('Owner already exists');
     }
     let { fullname, email, password } = req.body;
     let createdOwner =  await ownerModel.create({
        fullname,
        email,
        password,
        // products: [],
        // gstin: req.body.gstin,
        // picture: req.body.picture,
     });
     res.status(201).send(createdOwner);
    });    
}


router.get('/', (req, res) => {
    res.send('This is working');
});


module.exports = router;
// $env:NODE_ENV="production"; node yourScript.js
