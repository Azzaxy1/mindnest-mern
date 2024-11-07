import path from "path";

import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";

import blogRoutes from "./routes/blog.route";
import authRoutes from "./routes/auth.route";
import connectDB from "./config/db.config";
import { CustomError } from "./types/customError";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;
const localhost = `http://localhost:${PORT}`;
const apiVersion = "/v1";

connectDB();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "images");
  },
  filename: (_req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../images")));
app.use(multer({ storage, fileFilter }).single("image"));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(`${apiVersion}/auth`, authRoutes);
app.use(`${apiVersion}/blog`, blogRoutes);
app.use(
  (error: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    const status = error.errorStatus || 500;
    const message = error.message || "An error occurred";
    const data = error.data;

    res.status(status).json({ message, data });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on ${localhost}`);
});
