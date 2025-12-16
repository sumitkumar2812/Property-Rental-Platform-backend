const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../model/User");


const generateToken = id =>{
    return jwt.sign({id}, process.env.JWT_TOKEN,{
        expiresIn: "1h"
    })
}


router.post("/register", async (req, res) =>{
    const {name , email, password, role} = req.body;

    try {
        var user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message: "User Already Exists"})
        }
        user = new User({
            name,
            email,
            password,
            role: role || "user"
        })
        await user.save();

        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id)
        })
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})



router.post("/login", async (req, res) =>{
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email})
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({message: "Invalid Credentials"})
        }
       
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id)
        })
        
    } catch (error) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


module.exports = router;

