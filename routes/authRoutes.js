const express = require("express");
const {protect} = require("../middleware/authMiddleware.js")
console.log("Express Type Check:", typeof express.Router);
const {registerUser, loginUser} = require("../controllers/authController.js")
const router = express.Router();

router.get("/profile", protect, (req,res) => {
    res.json(req.user)
})

router.post("/signup", registerUser);

router.post("/login", loginUser)

module.exports = router