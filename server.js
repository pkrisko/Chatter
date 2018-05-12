// Express
let express = require("express");
let app = express();
// Mongoose
let mongoose = require("mongoose");
// Path
let path = require("path");
// Session
let session = require("express-session");
app.use(session({
  secret: "Pen#Ic1HaU_Gq~,2^Z*&-$|e<.M]",
  resave: false,
  saveUninitialized: true // make sure this is added - new
}));
// Static Folder
app.use(express.static(__dirname + '/public/dist'));
// Body parser
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); // app.use(express.json()); 
// Backend config
require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);
// Server Listening
app.listen(1337, ()=> console.log("Server running at 1337"));