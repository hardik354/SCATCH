const mongoose = require("mongoose");
const config = require("config");

const dbgr = require("debug")("development:mongoose-connection");

mongoose.connect(`${config.get("MONGODB_URI")}/SCATCH`)
.then(function () {
     dbgr("MongoDB Connected...");
})
.catch(function (err) {
     dbgr(err); 
});
module.exports = mongoose.connection;

// $env:DEBUG="development:mongoose-connection"; node yourScript.js
// debug and config are both packages for Node.js that provide debugging and configuration functionality.