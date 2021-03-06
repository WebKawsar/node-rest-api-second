const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//Controllers
const { createNoteController, getAllNotesController, getNoteById, updateNoteById, deleteNoteById } = require("../controllers/noteController")



//Middleware
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

// Create Note
router.post("/",
[
    auth,
    check("title").notEmpty().withMessage("Title is required in check")
        .isLength({min: 3, max: 10}).withMessage("Title must be in between 3 to 10 chars check"),
    check("description").notEmpty().withMessage("Description is required in check")
        .isLength({min: 5, max: 15}).withMessage("Description must be in between 5 to 15 chars check")
], createNoteController)



// Get All Notes
router.get("/", [auth], getAllNotesController)


//Get Note find by Id
router.get("/:noteId",
[   
    auth,
    check("noteId", "Note Not Found in check").isMongoId()
], getNoteById)


//Update Note by Id
router.put("/:noteId",
[
    auth,
    check("noteId", "Note Not Found in check").isMongoId(),
    check("title").optional().notEmpty().withMessage("Title is required in check")
        .isLength({min: 3, max: 20}).withMessage("Title must be in between 3 to 20 chars check"),
    check("description").optional().notEmpty().withMessage("Description is required in check")
        .isLength({min: 5, max: 30}).withMessage("Description must be in between 5 to 30 chars check")
], updateNoteById)



// Delete Note by Id
router.delete("/:noteId", 
[
    auth,
    check("noteId", "Note Not Found").isMongoId(),
],
deleteNoteById)




module.exports = router;