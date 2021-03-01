const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");





const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator(value){
                return validator.isEmail(value)
            },
            message: "Must be a Valid Email"
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate: {
            validator(value){
                return !value.toLowerCase().includes("password");
            },
            message: "Password must not contain 'password' in Schema"
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    }


    
}, {
    timestamps: true,
    versionKey: false  // use for not create in database like "__v"
})


userSchema.methods.generateAuthToken = function(){
    
    const token = jwt.sign({id: this._id, isAdmin: this.isAdmin}, "secretKey", {expiresIn: "4h"});
    return token;
}


userSchema.pre("save", async function(next){

  const hashedPassword = await bcrypt.hash(this.password, 10);

  if(this.isModified("password")){

    this.password = hashedPassword;
  }
  next();

})

module.exports = mongoose.model("User", userSchema);