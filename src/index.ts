import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import fileRoutes from "./routes/files";

const app = express();

// Configure CORS to allow requests from the school management app
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Created uploads directory:", uploadsDir);
}

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// File routes
app.use("/files", fileRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    uploadsDir: uploadsDir 
  });
});

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
  console.log(`File server running on http://localhost:${PORT}`);
  console.log(`Uploads directory: ${uploadsDir}`);
});
