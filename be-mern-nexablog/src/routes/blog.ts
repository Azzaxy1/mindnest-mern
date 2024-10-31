import express from "express";
import { body } from "express-validator";

import { createBlog, getAllBlogs } from "../controllers/blogController";

const router = express.Router();

// Create -> POST
router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("Input title tidak sesuai"),
    body("body").isLength({ min: 10 }).withMessage("Input body tidak sesuai"),
  ],
  createBlog
);

// Read -> GET
router.get("/get", getAllBlogs);

export default router;
