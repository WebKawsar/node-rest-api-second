const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");




//Middleware
app.use(express.json())

//Moddels
const Note = require("./models/notes")




//Connecting to the Server
mongoose.connect("mongodb://localhost:/task-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database Connected Successfully"))
.catch((error) => console.log(error))


//Root URL
app.get("/", (req, res) => {

    res.send("Welcome to our server");
})



// Create Note
app.post("/notes",
[
    check("title").notEmpty().withMessage("Title is required in check")
        .isLength({min: 3, max: 10}).withMessage("Title must be in between 3 to 10 chars check"),
    check("description").notEmpty().withMessage("Description is required in check")
        .isLength({min: 5, max: 15}).withMessage("Description must be in between 5 to 15 chars check")
],
async(req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send(errors.array())
    }

    const note = new Note(req.body)
   try {

        await note.save();
        res.send(note);

   } catch (error) {
       
       res.status(500).send(error);
   }

})




// Get All Notes
app.get("/notes", async(req, res) => {

    try {

        const notes = await Note.find()
        if(notes.length){
            return res.send(notes)
        }
        res.status(404).send("No Note Found or Note create yeat");
        
    } catch (error) {
        
        res.status(500).send(error)
    }
})



//Get Note find by Id
app.get("/notes/:noteId",
[
    check("noteId", "Note Not Found in check").isMongoId()
],
async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){

        return res.status(400).send(errors.array());
    }

    const noteId = req.params.noteId;
    try {

        const note = await Note.findById(noteId)
        if(note){
            return res.send(note);
        }
        res.status(404).send("Note Not Found");
        
    } catch (error) {

        res.status(500).send(error);
    }

})


app.put("/notes/:noteId",
[
    check("noteId", "Note Not Found in check").isMongoId(),
    check("title").optional().notEmpty().withMessage("Title is required in check")
        .isLength({min: 3, max: 10}).withMessage("Title must be in between 3 to 10 chars check"),
    check("description").optional().notEmpty().withMessage("Description is required in check")
        .isLength({min: 5, max: 15}).withMessage("Description must be in between 5 to 15 chars check")
],
async(req, res) => {
    const noteId = req.params.noteId;
    const noteInput = Object.keys(req.body);
    const allowedUpdates = ["title", "description"];
    const isAllowed = noteInput.every(update => allowedUpdates.includes(update));
    if(!isAllowed) return res.status(400).send("Invalid Update");

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send(errors.array());
    }


    try {

        const note = await Note.findByIdAndUpdate(noteId, req.body, {
            new: true,
            runValidators: true
        })
        if(!note) return res.status(404).send("Note Not Found");
        res.send(note);

    } catch (error) {

        res.status(500).send(error);
    }


})


// Delete Note by Id
app.delete("/notes/:noteId",
check("noteId", "Note Not Found").isMongoId(),
async(req, res) => {

    const noteId = req.params.noteId;
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(errors.array())

    try {

        const note = await Note.findByIdAndDelete(noteId)
        if(!note) return res.status(404).send("Note Not Found");
        res.send(note);

    } catch (error) {
        res.status(500).send(error)
    }

})


app.get("*", (req, res) => {
    res.send("No Route Found")
})


//server creation
app.listen(8080, () => {
    console.log("Server is created and listening on prt 8080");
})
