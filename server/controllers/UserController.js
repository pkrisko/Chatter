let User = require("mongoose").model("User");
let bcrypt = require("bcrypt-nodejs");
var passport = require('passport');
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");



class UserController{

    // For registering a new user into Mongo.  Generates a new hashed password
    // with bcrypt so long as the password meets front and back-end validators.
    
    // Here, req.body should be an object with two keys, "user" and "passwords",
    // where user is the object data from the form and pw and pwc are the two passwords
    register(req,res) {
        // Check if passwords are equal
        if (req.body.passwords.pw !== req.body.passwords.pwc)
            return res.json({errors:{password:{message:"Passwords must match"}}});
        // Check to see if password meets regex before hashing
        if (!passwordRegex.test(req.body.passwords.pw))
            return res.json({errors:{password:{message:"Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and one special character ( ! @ $ % ^ & * )"}}});
        // Create a new user to store in the database
        var newUser = new User();
        newUser.firstName = req.body.user.firstName;
        newUser.lastName = req.body.user.lastName;
        newUser.email = req.body.user.email;
        newUser.password = bcrypt.hashSync(req.body.passwords.pw);
        // Save the user in the databse
        newUser.save(function(err) {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            var token = newUser.generateJwt();
            res.status(200);
            return res.json({"token" : token});
        });
    }

    login(req, res) {
        console.log("REACHING LOGIN FAM");
        User.findOne({email: req.body.email},(err,user)=>{
            if(err || user === null) {
                return res.json({errors:{email:{message:"Email not found. Try registry instead."}}});
            }
            else {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if(!result) {
                        return res.json({errors:{password:{message:"Incorrect password"}}});
                    }
                    else {
                        var token = user.generateJwt();
                        res.status(200);
                        return res.json({"token" : token});;
                    }
                })
            }
        })
    }

    profileRead(req,res) {
        // If no user ID exists in the JWT return a 401
        if (!req.payload._id) {
            res.status(401).json({
            "message" : "UnauthorizedError: private profile"
            });
        } else {
            // Otherwise continue
            User
            .findById(req.payload._id)
            .exec(function(err, user) {
                res.status(200).json(user);
            });
        }
    }

    // Assume user id has been passed in via req.body

    logout(req, res) {
        req.session.userId = null;
        return res.json(true)
    }
    
}

module.exports = new UserController(); 