import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// 🔑 Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ✅ Register User (Admin or Member)
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role, wing, flatNo, mobileNumber } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Create new user
    const user = await User.create({ 
      firstName, 
      lastName, 
      email, 
      password, 
      role,
      wing: wing || "N/A", // Default if missing
      flatNo: flatNo || "N/A",
      mobileNumber: mobileNumber || "N/A"
    });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🛠️ Temporary Setup Route to Create Admin
export const setupAdmin = async (req, res) => {
  try {
    const adminEmail = "admin@saptatarang.com";
    const adminPassword = "Admin@12345"; // User can change this later

    // Check if admin already exists
    let user = await User.findOne({ email: adminEmail });

    if (user) {
      return res.json({ message: "Admin user already exists", email: adminEmail });
    }

    // Create new admin
    user = await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
      wing: "AdminWing",
      flatNo: "000",
      mobileNumber: "0000000000"
    });

    res.status(201).json({
      message: "Admin user created successfully",
      email: user.email,
      password: adminPassword, // Returning password so user can see it (TEMPORARY)
      role: user.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
