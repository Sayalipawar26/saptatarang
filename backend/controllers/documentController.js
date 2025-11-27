import Document from "../models/documentModel.js";

// 🟢 Add a new document (Admin only)
export const addDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title, category } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;

    const doc = await Document.create({
      title,
      fileUrl,
      category: category || "General",
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      _id: doc._id,
      title: doc.title,
      fileUrl: doc.fileUrl,
      category: doc.category,
      uploadedBy: req.user.name,
      createdAt: doc.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📄 Get all documents (Everyone — Admin or Member)
export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find().populate("uploadedBy", "name email role");
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ Update document title or file (Admin only)
export const updateDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    if (req.body.title) doc.title = req.body.title;
    if (req.body.category) doc.category = req.body.category;
    if (req.file) doc.fileUrl = `/uploads/${req.file.filename}`;

    await doc.save();

    res.json({
      _id: doc._id,
      title: doc.title,
      fileUrl: doc.fileUrl,
      category: doc.category,
      updatedAt: doc.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ Delete document (Admin only)
export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    await doc.deleteOne();
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
