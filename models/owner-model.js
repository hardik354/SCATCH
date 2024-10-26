const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
fullname: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
},
email: String,
password: String,
products: {
    type:Array,
    default: []
}, 
gstin: String,
picture: String,
});

module.exports = mongoose.model("owner", ownerSchema);