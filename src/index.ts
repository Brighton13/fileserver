import express from "express";
import cors from "cors";
import path from "path";
import fileRoutes from "./routes/files";

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// File routes
app.use("/files", fileRoutes);

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
  console.log(`File server running on http://localhost:${PORT}`);
});
