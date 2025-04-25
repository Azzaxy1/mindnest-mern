import express from "express";
import { body } from "express-validator";

import {
  createJournal,
  deleteJournal,
  getAllJournals,
  getJournalById,
  updateJournal,
} from "../controllers/journal.controller";
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
  createJournal
);

// Read -> GET
router.get("/", authMiddleware, getAllJournals);

// Get One -> GET
router.get("/:id", authMiddleware, getJournalById);

// Update -> PUT
router.put(
  "/:id",
  authMiddleware,
  [
    body("title").isLength({ min: 5 }).withMessage("Input title tidak sesuai"),
    body("body").isLength({ min: 10 }).withMessage("Input body tidak sesuai"),
  ],
  updateJournal
);

// Delete -> DELETE
router.delete("/:id", authMiddleware, deleteJournal);

export default router;
