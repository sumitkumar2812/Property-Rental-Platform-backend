const User = require("../model/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message : "Email is not registerd"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: "Password is Wrong"})
        }

        const token = jwt.sign({id: user._id},process.env.JWT_TOKEN,{expiresIn: "1d"})

        res.status(200).json({
            message: "Login Successfully",
            token,
            role:user.role,
            user: {id: user._id, name: user.name, email: user.email}
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


const registerUser = async (req,res) => {
    try {
        const {name, email, password, role} = req.body

        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(400).json({message: "User Already Exist!"})
        }

        const user = await User.create({name, email, password, role});

        return res.status(201).json({message: "User Created", user})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = {registerUser, loginUser};



