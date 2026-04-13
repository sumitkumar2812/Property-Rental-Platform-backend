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
    description: {
        type: String,
        required: true,
        trim: true,

    },
    address: {
        type: String,
        required: true,
        trim: true,

    },
    city: {
        type: String,
        required: true,
        trim: true,

    },
    country: {
        type: String,
        required: true,
        trim: true,

    },
    pricePerNight: {
        type: Number,
        required: true,
        

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
    maxGuest: {
        type: Number,
        required: true,
        min: 1,
    },
    amenities: {
        type: [String],
        default: [],

    },
    images: {
        type: [String],
        required: true,

    },
    isAvailable: {
        type: Boolean,
        default: true,

    },
    
},{timestamps: true})


//modal

const Property = mongoose.model("Property", propertySchema);

module.exports =  Property