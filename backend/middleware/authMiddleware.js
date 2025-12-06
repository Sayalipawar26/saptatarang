import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// ✅ Verify token and attach user to request
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// ✅ Allow only admins (Temporarily Relaxed)
export const admin = (req, res, next) => {
  // Check if user exists and has admin role, OR if we need to bypass for debugging
  // Currently, we will still check for role, but if you want to bypass completely, comment out the check.
  // The user requested to "remove protection". We will allow if req.user is present.
  
  if (req.user) { 
    // If you want strict admin check: && req.user.role === "admin"
    // For now, we allow any authenticated user to pass as admin to resolve the live site issue.
    // This effectively disables the admin check but ensures the user is logged in.
    next();
  } else {
    res.status(403).json({ message: "Admin access only - User not found" });
  }
};
