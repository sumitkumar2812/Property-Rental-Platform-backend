const mongoose = require("mongoose");

//schema

const propertySchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        //require: true,
    },
    title: {
        type: String,
        require: true,
        trim: true,

    },
    description: {
        type: String,
        require: true,
        trim: true,

    },
    address: {
        type: String,
        require: true,
        trim: true,

    },
    city: {
        type: String,
        require: true,
        trim: true,

    },
    country: {
        type: String,
        require: true,
        trim: true,

    },
    pricePerNight: {
        type: Number,
        require: true,
        trim: true,

    },
    bedrooms: {
        type: Number,
        require: true,
        trim: true,
        min: 0,

    },
    bathrooms: {
        type: Number,
        require: true,
        trim: true,
        min: 0,

    },
    maxGuest: {
        type: Number,
        require: true,
        trim: true,
        min: 1,
    },
    amenities: {
        type: [String],
        default: [],

    },
    images: {
        type: [String],
        require: true,

    },
    isAvailable: {
        type: Boolean,
        default: true,

    },
    
},{timestamps: true})


//modal

const Property = mongoose.model("user", propertySchema);

module.exports =  Property 