const express = require("express");
const router = express.Router();



//Root URL
router.get("/", (req, res) => {

    res.send("Welcome to our server");
})

router.get("*", (req, res) => {
    res.send("No Route Found")
})

module.exports = router;