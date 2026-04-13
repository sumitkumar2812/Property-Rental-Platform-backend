const express = require("express");
const router = express.Router();
const { createProperty, getAllProperties ,getMyProperties, deleteProperty, updateProperty} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAllProperties);

router.get("/my-properties", protect, getMyProperties);

router.post("/", protect, createProperty);

router.delete("/:id", protect, deleteProperty)

router.put("/:id", protect, updateProperty);
module.exports = router;













































// const express = require("express");
// const router = express.Router();
// const Property = require("../model/Property")
// const {protect, authorize} = require("../middleware/authMiddleware")

// router.get("/", async (req, res) =>{
//     try {
//         const properties = await Property.find({})
//         res.json(properties)
//     } catch (err) {
//         console.error(err.message)
//         res.json(500).send("Server Error")
//     }
// });

// router.post("/", protect, authorize('host'), async (req, res) => {

//     const {title, description, price, location, bathrooms, bedrooms, imageUrls} = req.body;


//     try {
//         const newProperty = new Property({
//             user: req.user._id,
//             title,
//             description,
//             price,
//             location,
//             bathrooms,
//             bedrooms,
//             images: imageUrls 
//         })
//         const property = await newProperty.save();
//         res.status(201).json(property);
//     } catch (err) {
//         console.error(err.message)
//         res.json(500).send("Errors in Server")
//     }

// })

// module.exports = router;



