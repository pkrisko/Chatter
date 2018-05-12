let User = require("mongoose").model("User");
let bcrypt = require("bcrypt-nodejs");


class UserController{

    // For registering a new user into Mongo.  Generates a new hashed password
    // with bcrypt so long as the password meets front and back-end validators.
    register(req, res) {
        User.findOne({email:req.body.email},(err,user)=>{
            if(user) {
                return res.json({errors:"A user with this email already exists!"});
            }
            else {
                let newUser = new User(req.body);
 
                newUser.password = bcrypt.hashSync(req.body.password);
                let passcheck = bcrypt.compareSync(req.body.confirm, newUser.password);

                if(passcheck == true) {
                    newUser.save(err=>{
                        if(err) {    
                            return res.json({errors: err});
                        }
                        else {
                            req.session.userId = newUser._id;                             
                            return res.json(newUser);
                        }
                    })
                }
                else {    
                    return res.json({errors: "Passwords do not match!"});
                }
            }
        });
    }

    login(req, res) {
        User.findOne({email: req.body.email},(err,user)=>{
            if(err) {
                return res.json({errors: "Email not found. Try registry instead."})
            }
            else {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if(err) {
                        return res.json({errors: "Incorrect password"});
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
        res.json(true)
    }
    
}

module.exports = new UserController(); 