import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// 🧩 Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    wing: {
      type: String,
      required: [true, "Please add a wing"],
    },
    flatNo: {
      type: String,
      required: [true, "Please add a flat number"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Please add a mobile number"],
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
  },
  { timestamps: true }
);

// 🔐 Hash password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // avoid re-hashing
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Compare passwords for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🚀 Export model
const User = mongoose.model("User", userSchema);
export default User;
