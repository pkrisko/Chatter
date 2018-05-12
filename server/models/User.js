let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.model("User", new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true,
            minlength : [2, "First name must be more than 2 characters"],
            maxlength : [64, "First name must be less than 64 characters"]
        }, 
        lastName :  {
            type : String,
            required : true,
            minlength : [2, "Last name must be more than 2 characters"],
            maxlength : [64, "Last name must be less than 64 characters"]
        }, 
        email :  {
            type : String,
            required  :  true, 
            minlength  :  [6, "Email must be more than 6 characters"],
            maxlength  :  [128, "Last name must be less than 128 characters"], 
            validate  :  {
                validator : function(value) { // Simple email regex.  Shortest match would be a@b.co
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
                },
                message : "Invalid email!"
            }
        }, 
        password :  {
            type :  String,
            required: true,
            minlength: 8,
            validate: {
                validator: function( value ) { // Password regex.  Description provided in message.
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value);
                },
                message: "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number,and one special character ( ! @ $ % ^ & * )"
            }
        }, 
        admin: {
            type:Boolean,
            default:false,
            required:true
        },
    }, { timestamps : true } // Ensure that timestamps are created.  Default names createdAt and updatedAt are used.
));