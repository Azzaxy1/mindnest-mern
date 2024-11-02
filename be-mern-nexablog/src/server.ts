import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";

import blogRoutes from "./routes/blog.route";
import authRoutes from "./routes/auth.route";
import connectDB from "./config/db.config";
import { CustomError } from "./types/customError";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 8080;
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
app.use(multer({ storage, fileFilter }).single("image"));

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  next();
});

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
