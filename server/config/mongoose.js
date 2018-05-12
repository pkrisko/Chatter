let mongoose = require("mongoose");
let path = require("path");
let fs = require("fs");
let modelPath = path.join(__dirname,"./../models");

mongoose.connect("mongodb://localhost/chat");
mongoose.Promise = global.Promise;

fs.readdirSync(modelPath).forEach(function(file){
    if(file.indexOf(".js") >= 0){
        require(modelPath+"/"+file);
    }
})