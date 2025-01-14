import express from "express";
import multer from "multer";
import path from "path";
import authRouter from "./route/auth.route";
// Express app
const app = express();
// Multer for image uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

// Routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/auth", authRouter);
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }
  const fullUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  res.status(201).json({
    data: fullUrl,
    status: 201,
    error: null,
    message: "image uploaded successfully",
  });
});

export default app;
