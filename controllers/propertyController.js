const Property = require("../model/Property")

const createProperty = async (req, res) => {
    try {
        const propertyData = {...req.body, host: req.user._id}
        const property = await Property.create(propertyData)
        res.status(201).json({message : "Property Listed Successfully", property})
    } catch (error) {
        res.status(500).json({mesage: error.message})
    }
}


// propertyController.js mein getAllProperties ko update karo
const getAllProperties = async (req, res) => {
    try {
        const { city, minPrice, maxPrice, bedrooms } = req.query;
        let queryObject = {};

        // 1. City Filter (Case-insensitive search)
        if (city) {
            queryObject.location = { $regex: city, $options: 'i' };
        }

        // 2. Price Range Filter
        if (minPrice || maxPrice) {
            queryObject.price = {};
            if (minPrice) queryObject.price.$gte = Number(minPrice);
            if (maxPrice) queryObject.price.$lte = Number(maxPrice);
        }

        // 3. Bedrooms Filter
        if (bedrooms) {
            queryObject.bedrooms = bedrooms;
        }

        const properties = await Property.find(queryObject);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getMyProperties = async (req, res) => {
    try {
        const properties = await Property.find({host:req.user._id})
        res.status(201).json(properties)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getPropertyById = async (req, res) => {

    try {
        const property = await Property.findById(req.params.id);
        if(!property) {
            return res.status(404).json({message: "Property not found."})
        }
        return res.json(property);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteProperty = async (req, res) => {

    try {
        const property = await Property.findById(req.params.id);
        if(!property) {
            return res.status(404).json({message: "Property not found."})
        }
        if(property.host.toString() !== req.user.id) {
            res.status(401).json({message: "User not Authorized to delete this Property"})
        }
        await property.deleteOne();
        res.status(200).json({message: "Property Deleted Successfully."})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateProperty = async (req, res) => {

    try {
        let property = await Property.findById(req.params.id);

        if(!property) {
            return res.status(404).json({message: "Property not found."})
        }

        if(property.host.toString() !== req.user.id) {
            res.status(401).json({message: "User not Authorized to update this Property"})
        }

        property = await Property.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true,
        })
        res.status(200).json({message: "Property Updated Successfully."})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {createProperty, getAllProperties ,getMyProperties, getPropertyById, deleteProperty, updateProperty}