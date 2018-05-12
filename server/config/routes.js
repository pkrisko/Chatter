let UserController = require("../controllers/UserController.js");

let path = require('path');

module.exports = function(app){
    
    app.post("/login", UserController.login);
    app.get("/logout", UserController.logout);    
    app.post("/register", UserController.register);

    app.all("**", (request, response) => { response.sendFile(path.resolve("./public/dist/index.html")) });
    
}