require("dotenv").config();
const express = require("express");
const mongoose  = require("mongoose");
const cors = require("cors");
const propertyRoutes = require("./routes/propertyRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected...")
    } catch (error) {
        console.error(error.message)
        process.exit(1)
        
    }
}

connectDB()


app.get("/", (req, res)=>{
    
    res.send("API for Testing...")
})

app.use("/api/properties", propertyRoutes);

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${5000}`));
