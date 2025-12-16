const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no two users can have the same email
        trim: true,
        lowercase: true // Store emails in lowercase for consistency
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'host', 'admin'], // Users can be guests, property hosts, or administrators
        default: 'user'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};



module.exports = mongoose.model("User", UserSchema);
