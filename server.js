// Express
let express = require("express");
let app = express();
// Path
let path = require("path");
// Mongoose
let mongoose = require("mongoose");
// Session
let session = require("express-session");
// Passport
var passport = require('passport');
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
// Passport needs to be declared here, just after models and right before API routes
require('./server/config/passport');
app.use(passport.initialize());
require("./server/config/routes.js")(app);
// Error handlers for tokens
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});
// Server Listening
app.listen(1337, ()=> console.log("Server running at 1337"));

