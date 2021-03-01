const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");





//import notes routes
const notesRoute = require("./routes/notes");
const usersRoute = require("./routes/users");
const indexRoute = require("./routes")



//Middleware
app.use(express.json())
app.use(cookieParser("secretKey"))
// app.use(auth)



//Connecting to the Server
const { connectDB } = require("./db/dbConnection");
const router = require("./routes/notes");
connectDB();


//Routes
app.use("/notes", notesRoute);
app.use("/users", usersRoute);
app.use("/", indexRoute)



// // Create Note
// app.post("/notes",
// [
//     check("title").notEmpty().withMessage("Title is required in check")
//         .isLength({min: 3, max: 10}).withMessage("Title must be in between 3 to 10 chars check"),
//     check("description").notEmpty().withMessage("Description is required in check")
//         .isLength({min: 5, max: 15}).withMessage("Description must be in between 5 to 15 chars check")
// ], createNoteController)



// // Get All Notes
// app.get("/notes", getAllNotesController)


// //Get Note find by Id
// app.get("/notes/:noteId",
// [
//     check("noteId", "Note Not Found in check").isMongoId()
// ], getNoteById)


// //Update Note by Id
// app.put("/notes/:noteId",
// [
//     check("noteId", "Note Not Found in check").isMongoId(),
//     check("title").optional().notEmpty().withMessage("Title is required in check")
//         .isLength({min: 3, max: 10}).withMessage("Title must be in between 3 to 10 chars check"),
//     check("description").optional().notEmpty().withMessage("Description is required in check")
//         .isLength({min: 5, max: 15}).withMessage("Description must be in between 5 to 15 chars check")
// ], updateNoteById)


// // Delete Note by Id
// app.delete("/notes/:noteId", check("noteId", "Note Not Found").isMongoId(), deleteNoteById)




//server creation
app.listen(8080, () => {
    console.log("Server is created and listening on prt 8080");
})
