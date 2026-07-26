const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const rawUri = process.env.MONGO_URI || "";
        const maskedUri = rawUri.replace(/:([^@]+)@/, ":******@") || "UNDEFINED";
        console.log(`🔌 Attempting MongoDB connection to: ${maskedUri}`);
        
        const conn = await mongoose.connect(rawUri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log(`✅ MongoDB connected successfully to host: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;