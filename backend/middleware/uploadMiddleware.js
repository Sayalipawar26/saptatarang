import multer from "multer";
import path from "path";

// ⚙️ Set up file storage configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`
    );
  },
});

// ✅ File type filter (only allow PDFs, images, docs)
function checkFileType(file, cb) {
  const filetypes = /pdf|jpg|jpeg|png|doc|docx/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Invalid file type! Only PDF, JPG, PNG, and DOC allowed.");
  }
}

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => checkFileType(file, cb),
});
