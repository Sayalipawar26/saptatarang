import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import path from "path";
import documentRoutes from "./routes/documentRoutes.js";


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: [
      "http://localhost:3001",             
      "http://localhost:3000",  
      "https://saptatarang0.netlify.app"          
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/members", memberRoutes);

app.use("/api/docs", documentRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
