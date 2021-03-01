const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "Title must be greater than 3 char"], // We can this type validation apply in anywhere
        maxlength: [20, "Title must be lower than 20 char"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [5, "Description must be greater than 5 char"], // We can this type validation apply in anywhere
        maxlength: [30, "Description must be lower than 30 char"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
   
}, {
    timestamps: true,
    versionKey: false  // use for not create in database like "__v"
})

const Note = mongoose.model("Note", notesSchema);
module.exports = Note;
