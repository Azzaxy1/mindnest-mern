import express from "express";
import { createBlog, getAllBlogs } from "../controllers/blogController";

const router = express.Router();

// Create -> POST
router.post("/post", createBlog);

// Read -> GET
router.get("/get", getAllBlogs);

export default router;
