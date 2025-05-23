import express from "express";
import { body } from "express-validator";

import {
  getMe,
  googleOauth,
  googleOauthCallback,
  login,
  register,
} from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").isLength({ min: 5 }).withMessage("Input name tidak sesuai"),
    body("email").isLength({ min: 5 }).withMessage("Input email tidak sesuai"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Input password tidak sesuai"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isLength({ min: 5 }).withMessage("Input email tidak sesuai"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Input password tidak sesuai"),
  ],
  login
);

// Google Login
router.get("/google", googleOauth);

// Google Callback Login
router.get("/google/callback", googleOauthCallback);

router.get("/me", authMiddleware, getMe);

export default router;
