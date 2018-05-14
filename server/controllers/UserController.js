let User = require("mongoose").model("User");
let bcrypt = require("bcrypt-nodejs");


class UserController{

    // For registering a new user into Mongo.  Generates a new hashed password
    // with bcrypt so long as the password meets front and back-end validators.
    
    // Here, req.body should be an object with two keys, "user" and "passwords",
    // where user is the object data from the form and pw and pwc are the two passwords
    register(req, res) {
        console.log(req.body);
        // Check if passwords are equal
        if (req.body.passwords.pw !== req.body.passwords.pwc)
            return res.json({errors:{password:{message:"Passwords must match"}}});
        // Else delete these autogenerated fields before MongoDB entry
        delete req.body.user._id;
        delete req.body.user.createdAt;
        delete req.body.user.updatedAt;
        // Hash the password
        req.body.user.password = bcrypt.hashSync(req.body.passwords.pw);

        // Does a user with this email already exist?
        User.findOne({email:req.body.user.email},(err,user)=>{
            if(user) {
                return res.json({errors:{email:{message:"A user with this email already exists!"}}});
            }
            else {
                // Add to the DB
                User.create(req.body.user, (err, user) => {
                    if (err) {
                        return res.json(err);
                    } else {
                        req.session.userId = user._id;
                        return res.json(user);
                    }
                })
            }
        });
    }

    login(req, res) {

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
                        req.session.userId = user._id;
                        return res.json(user);
                    }
                })
            }
        })
    }

    logout(req, res) {
        req.session.userId = null;
        return res.json(true)
    }
    
}

module.exports = new UserController(); 