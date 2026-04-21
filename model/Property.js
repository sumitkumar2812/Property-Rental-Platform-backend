const mongoose = require("mongoose");

//schema


const propertySchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,

    },
    location : {
        type: String,
        required: true,
        trim: true,

    },
    price:{
        type:Number,
        required:true,
        trim:true,

    },
     image: {
        type: [String],
        required: true,

    },
    description: {
        type: String,
        required: true,
        trim: true,

    },
    bedrooms: {
        type: Number,
        required: true,
        min: 0,
    },
    bathrooms: {
        type: Number,
        required: true,
        min: 0,
    },
   
    
},{timestamps: true})


//modal

const Property = mongoose.model("Property", propertySchema);

module.exports =  Property