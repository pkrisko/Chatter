let UserController = require("../controllers/UserController.js");
let path = require('path');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'Pen#Ic1HaU_Gq~,2^Z*&-$|e<.M]',
  userProperty: 'payload'
});

module.exports = function(app){
    
    app.post("/login", auth, UserController.login);
    app.get("/logout", auth, UserController.logout);    
    app.post("/register", auth, UserController.register);

    app.all("**", (request, response) => { response.sendFile(path.resolve("./public/dist/index.html")) });
    
}