const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "Title must be greater than 3 char"], // We can this type validation apply in anywhere
        maxlength: [10, "Title must be lower than 10 char"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [5, "Description must be greater than 5 char"], // We can this type validation apply in anywhere
        maxlength: [15, "Description must be lower than 15 char"]
    },
   
}, {
    timestamps: true,
    versionKey: false  // use for not create in database like "__v"
})

const Note = mongoose.model("Note", notesSchema);
module.exports = Note;
