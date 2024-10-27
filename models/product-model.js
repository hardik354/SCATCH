const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
name : String,
image: {
    data: Buffer,
    contentType: String
  },
price : Number,
discount:{
    type: Number,
    default: 0,
 },
bgcolor:{
    type: String,
    default: '#ffffff',
} ,
panelcolor:{
    type: String,
    default: '#000000',
} ,
textcolor: {
    type: String,
    default: '#ffffff',
},
});

module.exports = mongoose.model("product", productSchema);


