const express = require("express");
const { check } = require("express-validator");
const router = express.Router();


//Middleware
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");


//Controllers
const { addUserController, getUsersController, getUserController, loginController, logOutController } = require("../controllers/usersController")



router.post("/",
[
    check("firstname", "Firstname is required").notEmpty(),
    check("lastname", "Lastname is required").notEmpty(),
    check("email", "Email is required").notEmpty(),
    check("email", "Email must be valid").isEmail(),
    check("password", "Password is required").notEmpty(),
    check("password", "Password must be a 6 chars long").isLength({min: 6}),
    // check("password").custom((value, { req }) => {
    //     const password = value.includes("password")
    //     console.log(password);
    //     if(password){

    //         return true;

    //     } else{

    //         throw new Error("Password can't contain 'password'");
    //     }
    // }),
    check("confirmpassword", "Confirmpassword is required").notEmpty(),
    check("confirmpassword").custom((value, { req }) => {
        if(value !== req.body.password){

            throw new Error("Confirm password don't match")

        } else{
            return true;
        }
    })
],
addUserController)

router.get("/", [ auth, admin ], getUsersController);
router.get("/me", auth, getUserController);
router.post("/login", loginController);



router.post("/logout", auth, logOutController);


module.exports = router;