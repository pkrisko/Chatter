let express = require("express");
let app = express();
const path = require("path");

// Static Folder
app.use(express.static(__dirname + '/public/dist'));

// Body parser
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost/restaurantsSchema');


// Routes

app.all("*", (req,res,next) =>  {
  res.sendFile(path.resolve("./public/dist/index.html"));
})

// Server Listening
app.listen(1337, ()=> console.log("Server running at 1337"));