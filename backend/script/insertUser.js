// insertAdmin.js
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI:", MONGO_URI);

const insertAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ Email: "admin@example.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      return;
    }

    // Create admin user
    const admin = new User({
      UserName: "Admin User",
      Email: "admin@example.com",
      Password: await bcrypt.hash("administrator", 10),
    });

    await admin.save();
    console.log("✅ Admin user inserted successfully!");

  } catch (err) {
    console.error("❌ Error inserting admin:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed");
  }
};

// Run the script
insertAdmin();
