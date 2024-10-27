const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn');
const{
    registerUser,
    loginUser,
    logout
} = require('../controllers/authController');


router.get('/', (req, res) => {
    res.send('This is the working');
});

// moving the whole funtion in controller(authController.js) for better organization
router.post('/register',registerUser);

// login
router.post('/login', loginUser);

// logout
router.get('/logout', logout);


 // $env:NODE_ENV="production"; node yourScript.js
 // $env:NODE_ENV="development"; node yourScript.js
module.exports = router;
