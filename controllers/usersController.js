const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const _ = require("lodash");


//Moddels
const User = require("../models/user")





module.exports.addUserController = async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send(errors.array())
    }

    const pickedProperty = _.pick(req.body, ["firstname", "lastname", "email", "password", "confirmpassword"]);
    const user = new User(pickedProperty);
    try {
       
        const foundUser = await User.findOne({email: req.body.email})
        if(foundUser){
            return res.status(400).send("Email Already Exists");
        }

        await user.save();
        res.send({
            
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            createdAt: user.createdAt,

        });

    } catch (error) {
       
       res.status(500).send(error);
    }
}



module.exports.getUsersController = async(req, res) => {
    
    try {

        const users = await User.find({}, "-password"); //if we give param like as "-password" it will be hide on response
        res.send(users);

    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports.getUserController = async(req, res) => {

    const id = req.user._id;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).send(errors.array());
    }

    try {

        const user = await User.findById(id, "-password");
        if(!user){
            return res.status(404).send("User Not Found");
        }
        res.send(user);

    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports.loginController = async(req, res) => {

    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).send("Unable to Login");
        }
    
        const isMatched = bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(400).send("Unable to Login");
        }

        //generateAuthToken
        const token = user.generateAuthToken();
        //send as header
        // res.header("X-Auth-Token", token);
        res.cookie("auth", token, {
            httpOnly: true,
            sameSite: true,
            signed: true,
            maxAge: 4 * 60 * 60 * 1000
        });

        res.send("Login Success!!!")

    } catch (error) {

        res.status(500).send(error);
    }
}



module.exports.logOutController = (req, res) => {

    res.clearCookie("auth");
    res.send("Successfully Logout");
}



