import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload a single file
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ filename: req.file.filename, url: `${req.protocol}://${process.env.BASE_DOMAIN}/uploads/${req.file.filename}` });
});

// Upload multiple files
router.post("/upload-multiple", upload.array("files", 10), (req, res) => {
  if (!req.files) return res.status(400).json({ message: "No files uploaded" });
  const files = (req.files as Express.Multer.File[]).map(file => ({
    filename: file.filename,
    url: `${req.protocol}://${process.env.BASE_DOMAIN}/uploads/${file.filename}`
  }));
  res.json({ files });
});

export default router;
