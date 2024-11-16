import express from "express";
import { body } from "express-validator";

import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blog.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

// Create -> POST
router.post(
  "/",
  authMiddleware,
  [
    body("title").isLength({ min: 5 }).withMessage("Input title tidak sesuai"),
    body("body").isLength({ min: 10 }).withMessage("Input body tidak sesuai"),
  ],
  createBlog
);

// Read -> GET
router.get("/", authMiddleware, getAllBlogs);

// Get One -> GET
router.get("/:id", authMiddleware, getBlogById);

// Update -> PUT
router.put(
  "/:id",
  authMiddleware,
  [
    body("title").isLength({ min: 5 }).withMessage("Input title tidak sesuai"),
    body("body").isLength({ min: 10 }).withMessage("Input body tidak sesuai"),
  ],
  updateBlog
);

// Delete -> DELETE
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
