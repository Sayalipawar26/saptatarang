import User from "../models/userModel.js";

// ➕ Add Member (Admin only)
export const addMember = async (req, res) => {
  try {
    const { firstName, lastName, email, password, wing, flatNo, mobileNumber } = req.body;

    if (!firstName || !lastName || !email || !password || !wing || !flatNo || !mobileNumber)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newMember = await User.create({
      firstName,
      lastName,
      email,
      password,
      wing,
      flatNo,
      mobileNumber,
      role: "member",
    });

    res.status(201).json({
      _id: newMember._id,
      firstName: newMember.firstName,
      lastName: newMember.lastName,
      email: newMember.email,
      wing: newMember.wing,
      flatNo: newMember.flatNo,
      mobileNumber: newMember.mobileNumber,
      role: newMember.role,
      createdAt: newMember.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📋 Get All Members (Admin only)
export const getMembers = async (req, res) => {
  try {
    const members = await User.find({ role: "member" }).select("-password").sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ Update Member (Admin only)
export const updateMember = async (req, res) => {
  try {
    const { firstName, lastName, email, password, wing, flatNo, mobileNumber } = req.body;
    const member = await User.findById(req.params.id);

    if (!member || member.role !== "member")
      return res.status(404).json({ message: "Member not found" });

    if (firstName) member.firstName = firstName;
    if (lastName) member.lastName = lastName;
    if (email) member.email = email;
    if (password) member.password = password;
    if (wing) member.wing = wing;
    if (flatNo) member.flatNo = flatNo;
    if (mobileNumber) member.mobileNumber = mobileNumber;

    await member.save();

    res.json({
      _id: member._id,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      wing: member.wing,
      flatNo: member.flatNo,
      mobileNumber: member.mobileNumber,
      role: member.role,
      updatedAt: member.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ Delete Member (Admin only)
export const deleteMember = async (req, res) => {
  try {
    const member = await User.findById(req.params.id);

    if (!member || member.role !== "member")
      return res.status(404).json({ message: "Member not found" });

    await member.deleteOne();

    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
