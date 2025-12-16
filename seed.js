require("dotenv").config()
const mongoose = require("mongoose")
const Property = require("./model/Property")

const propertiesData = [
    {
        // For now, using a dummy ObjectId since we haven't created a User model/user data yet.
        // When you implement User auth, make sure this `host` ID corresponds to a real User's ID.
        host: new mongoose.Types.ObjectId(),
        title: 'Modern Apartment in Downtown Kanpur',
        description: 'Experience comfort and style in this contemporary apartment located in the heart of Kanpur. Walking distance to malls and restaurants.',
        address: '15 Civil Lines',
        city: 'Kanpur',
        country: 'India',
        pricePerNight: 2500, // INR
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        amenities: ['Wi-Fi', 'AC', 'Fully Equipped Kitchen', 'TV', 'Parking'],
        images: [
            'https://res.cloudinary.com/dzbfzovvx/image/upload/v1751347923/ad6ba7bf5446d0acbc39adb41cbc94c9_c5vgoc.jpg'
            
        ],
        isAvailable: true,
    },
    {
        host: new mongoose.Types.ObjectId(),
        title: 'Cozy Studio near IIT Kanpur',
        description: 'Perfect for students or solo travelers. A compact yet comfortable studio apartment with easy access to IIT Kanpur campus.',
        address: '789 Nankari',
        city: 'Kanpur',
        country: 'India',
        pricePerNight: 1200,
        bedrooms: 0, // Studio
        bathrooms: 1,
        maxGuests: 1,
        
        amenities: ['Wi-Fi', 'Mini-Fridge', 'Study Desk', 'Public Transport Access'],
        images: [
            'https://res.cloudinary.com/dzbfzovvx/image/upload/v1751347923/72c921591058bba1215c367dc0d91708_xo9mpr.jpg'
            
        ]
    },

    {
        host: new mongoose.Types.ObjectId(),
        title: 'Spacious 3BHK in Swaroop Nagar',
        description: 'Large family-friendly apartment with all modern amenities. Ideal for extended stays or group travel, near prominent areas.',
        address: '45 Swaroop Nagar',
        city: 'Kanpur',
        country: 'India',
        pricePerNight: 4000,
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        amenities: ['Wi-Fi', 'AC', 'Full Kitchen', 'Washing Machine', 'Balcony', 'Elevator'],
        images: [
            'https://res.cloudinary.com/dzbfzovvx/image/upload/v1751347923/10eb964a8a4b5f98c478feb78b02613c_ashffv.jpg'
           
        ]
    },
     {
        host: new mongoose.Types.ObjectId(),
        title: 'Spacious 3BHK in Swaroop Nagar',
        description: 'Large family-friendly apartment with all modern amenities. Ideal for extended stays or group travel, near prominent areas.',
        address: '45 Swaroop Nagar',
        city: 'Kanpur',
        country: 'India',
        pricePerNight: 4000,
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        amenities: ['Wi-Fi', 'AC', 'Full Kitchen', 'Washing Machine', 'Balcony', 'Elevator'],
        images: [
            'https://res.cloudinary.com/dzbfzovvx/image/upload/v1751347923/10eb964a8a4b5f98c478feb78b02613c_ashffv.jpg'
           
        ]
    },
     {
        host: new mongoose.Types.ObjectId(),
        title: 'Spacious 3BHK in Swaroop Nagar',
        description: 'Large family-friendly apartment with all modern amenities. Ideal for extended stays or group travel, near prominent areas.',
        address: '45 Swaroop Nagar',
        city: 'Kanpur',
        country: 'India',
        pricePerNight: 4000,
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        amenities: ['Wi-Fi', 'AC', 'Full Kitchen', 'Washing Machine', 'Balcony', 'Elevator'],
        images: [
            'https://res.cloudinary.com/dzbfzovvx/image/upload/v1751347923/10eb964a8a4b5f98c478feb78b02613c_ashffv.jpg',
        ]
    }
    // Add more properties as you like! Use Unsplash for good images.
];

const seedDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected for Seeding...")

        await Property.deleteMany({})
        console.log("Existing Properties Cleared")

        await Property.insertMany(propertiesData)
        console.log("Database with new Properties")
    } catch (err) {
        console.error("Property seeding:", err.message )
        process.exit(1);

    } finally {
        mongoose.connection.close()
    }

       
}

seedDB()