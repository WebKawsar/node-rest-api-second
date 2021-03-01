const mongoose = require("mongoose");



//Connecting to the Server
module.exports.connectDB = async() => {

    try {

        await mongoose.connect("mongodb://localhost:/task-app", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })
        console.log("Database Connected Successfully");

    } catch (error) {

        console.log(error)
    }
}