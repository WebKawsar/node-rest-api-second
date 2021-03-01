const jwt = require("jsonwebtoken");
const User = require("../models/user");



module.exports.auth = async(req, res, next) => {

    if(req.signedCookies){

        //acessing cookies
        const token = req.signedCookies["auth"];

        try {

            //verify token
            const decoded = jwt.verify(token, "secretKey")

            //getting user
            const user = await User.findById(decoded.id);
            req.user = user;
            next();
            
        } catch (error) {
            res.status(401).send("UnAuthorized Access");
        }

    } else {
        res.status(401).send("No Token Provided or Unauthorized")
    }

}






