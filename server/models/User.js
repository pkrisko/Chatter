let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : [true, "First name is required!"],
            minlength : [2, "First name must be more than 1 characters"],
            maxlength : [64, "First name must be less than 64 characters"]
        }, 
        lastName :  {
            type : String,
            required : [true, "Last name is required!"],
            minlength : [2, "Last name must be more than 1 characters"],
            maxlength : [64, "Last name must be less than 64 characters"]
        }, 
        email :  {
            type : String,
            unique : true,
            required  :  [true, "Email is required!"], 
            minlength  :  [6, "Email must be more than 5 characters"],
            maxlength  :  [128, "Last name must be less than 128 characters"], 
            validate  :  {
                validator : function(v) { // Simple email regex.  Shortest match would be a@b.co
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
                },
                message : "Invalid email!"
            }
        }, 
        password :  {
            type :  String,
            required: true,
            minlength: [8, "Password must be more than 7 characters"]
        }, 
        admin: {
            type:Boolean,
            default:false,
            required:true
        },
    }, 
    { 
        timestamps : true // Ensure that timestamps are created.  Default names createdAt and updatedAt are used.
    } 
)

// Add a generateJwt method for each user JSON instance. Used to keep passwords
// out of token information stored. Tokens expire after "exp", set here to one week.
userSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email : this.email,
        firstName : this.firstName,
        exp : parseInt(expiry.getTime() / 1000),
    }, "Pen#Ic1HaU_Gq~,2^Z*&-$|e<.M]"); // Secret
};



mongoose.model("User", userSchema);