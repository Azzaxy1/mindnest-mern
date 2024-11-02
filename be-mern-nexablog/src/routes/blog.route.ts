import express from "express";
import { body } from "express-validator";

import {
  createBlog,
  getAllBlogs,
  getBlogById,
} from "../controllers/blog.controller";

const router = express.Router();

// Create -> POST
router.post(
  "/",
  [
    body("title").isLength({ min: 5 }).withMessage("Input title tidak sesuai"),
    body("body").isLength({ min: 10 }).withMessage("Input body tidak sesuai"),
  ],
  createBlog
);

// Read -> GET
router.get("/", getAllBlogs);

// Get One -> GET
router.get("/:id", getBlogById);

export default router;
