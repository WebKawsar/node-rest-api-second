const { validationResult } = require("express-validator");

//Moddels
const Note = require("../models/notes")





// Create Note
module.exports.createNoteController = async(req, res) => {
    
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

}


// Get All Notes
module.exports.getAllNotesController = async(req, res) => {

    try {

        const notes = await Note.find()
        if(notes.length){
            return res.send(notes)
        }
        res.status(404).send("No Note Found or Note create yeat");
        
    } catch (error) {
        
        res.status(500).send(error)
    }
}


//Get Note find by Id
module.exports.getNoteById = async(req, res) => {

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

}


//Update Note by Id
module.exports.updateNoteById = async(req, res) => {

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


}


// Delete Note by Id
module.exports.deleteNoteById = async(req, res) => {

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

}

