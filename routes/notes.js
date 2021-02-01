const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//Controllers
const { createNoteController, getAllNotesController, getNoteById, updateNoteById, deleteNoteById } = require("../controllers/noteController")




// Create Note
router.post("/",
[
    check("title").notEmpty().withMessage("Title is required in check")
        .isLength({min: 3, max: 10}).withMessage("Title must be in between 3 to 10 chars check"),
    check("description").notEmpty().withMessage("Description is required in check")
        .isLength({min: 5, max: 15}).withMessage("Description must be in between 5 to 15 chars check")
], createNoteController)



// Get All Notes
router.get("/", getAllNotesController)


//Get Note find by Id
router.get("/:noteId",
[
    check("noteId", "Note Not Found in check").isMongoId()
], getNoteById)


//Update Note by Id
router.put("/:noteId",
[
    check("noteId", "Note Not Found in check").isMongoId(),
    check("title").optional().notEmpty().withMessage("Title is required in check")
        .isLength({min: 3, max: 10}).withMessage("Title must be in between 3 to 10 chars check"),
    check("description").optional().notEmpty().withMessage("Description is required in check")
        .isLength({min: 5, max: 15}).withMessage("Description must be in between 5 to 15 chars check")
], updateNoteById)



// Delete Note by Id
router.delete("/:noteId", check("noteId", "Note Not Found").isMongoId(), deleteNoteById)




module.exports = router;