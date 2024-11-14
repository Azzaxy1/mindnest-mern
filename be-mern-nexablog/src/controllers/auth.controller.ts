import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../types/customError";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err: CustomError = new Error("Input tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = new Error("All input is required");
    res.status(400).json({ message: error.message });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = new User({
    name,
    email,
    password: hashedPassword,
  });

  const token = await result.generateAuthToken();
  result.token = token;
  const savedResult = await result.save();

  res.status(201).json({
    data: {
      token: savedResult.token,
    },
  });
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err: CustomError = new Error("Input tidak sesuai");
      err.errorStatus = 400;
      err.data = errors.array();
      return;
    }
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All input is required");
      res.status(400).json({ message: error.message });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      res.status(404).json({ message: error.message });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = await user.generateAuthToken();

    res.status(200).json({
      data: { token },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error!" });
  }
};

export { register, login };
