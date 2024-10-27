const userModel = require('../models/user-model');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

// to validate user registration data
module.exports.registerUser =async (req, res) => {
    try{
        let { fullname, email, password } = req.body;
        // now ek cheez yeh ki mongodb schemaless hai,so agar yha pe koi field nahi dete hai to vo fir bhi create kar dega to handle this we using joi(package) based validation so it will automatically validate the fields.and if any field is missing or not valid then it will return error message.
    
     let findUser =  await userModel.findOne({email: email});
     if(findUser) return res.status(400).send("User already exists please login");

        bcrypt.genSalt(10,  (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err) return res.send(err.message);
                else {
                    // now create the user
                    let user = await userModel.create({
                        fullname, 
                        email, 
                        password : hash
                       });
                        // now generate the token
                    // moving token to utils folder and using here by calling generateToken function
                    let token = generateToken(user._id);
                     res.cookie("token",token); // set the token in cookie
                     res.send("user created successfully");
                  }
            });
        });
    } catch(err) {
    res.send(err.message);
    }  
}

//  to validate user login data
module.exports.loginUser = async (req, res) => {
    try{
        let { email, password } = req.body;

        let user = await userModel.findOne({email: email});
        if(!user) return res.status(400).send("Invalid email or password");
   
        bcrypt.compare(password, user.password , (err, result) => {
        if(result){
            let token = generateToken(user);
            res.cookie("token",token); // set the token in cookie
            res.send("user logged in successfully");
        }
        else return res.status(400).send("Invalid email or password");
        });
       
    } catch(err) {
        res.send(err.message);
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}