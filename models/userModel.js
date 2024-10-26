const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
fullname: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
},
email: String,
password: String,
cart: {
    type:Array,
    default: []
},
isadmin: Boolean,
orders: {
    type:Array,
    default: []
}, 
contact: Number,
picture: String,
});

module.exports = mongoose.model("user", userSchema);