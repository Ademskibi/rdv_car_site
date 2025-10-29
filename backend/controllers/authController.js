import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ✅ Register new user
export const register = async (req, res) => {
  try {
    const { UserName, Email, Password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered." });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create user
    const newUser = new User({
      UserName,
      Email,
      Password: hashedPassword,
      Role: role || "user", // default role if not provided
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("❌ Error in register:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login user
export const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // Find user
    const user = await User.findOne({ Email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    // Compare password
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password." });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.Email,
        role: user.Role, // ✅ include role in token
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        UserName: user.UserName,
        Email: user.Email,
        role: user.Role, // ✅ send role to frontend
      },
    });
  } catch (error) {
    console.error("❌ Error in login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Middleware to verify token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided." });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
