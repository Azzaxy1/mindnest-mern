import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../types/customError";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err: CustomError = new Error("Input is not valid");
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = await newUser.generateAuthToken();

    res.status(201).json({
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
    return;
  }
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

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      res.status(404).json({ message: "Invalid credentials" });
      return;
    }

    const token = await user.generateAuthToken();

    res.status(200).json({
      data: { token },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error!" });
    return;
  }
};

const getMe = (req: Request, res: Response) => {
  const user = req.user;

  res.status(200).json({
    data: user,
  });
};

export { register, login, getMe };
