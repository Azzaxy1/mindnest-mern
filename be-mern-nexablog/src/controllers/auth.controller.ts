import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../types/customError";
import { Auth } from "../models/auth.model";

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
  }

  const result = new Auth({
    name,
    email,
    password,
  });

  const savedResult = await result.save();

  res.status(201).json({
    message: "Register Success",
    data: savedResult,
  });
};

const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err: CustomError = new Error("Input tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("All input is required");
    res.status(400).json({ message: error.message });
  }

  const user = await Auth.findOne({ email, password });

  if (!user) {
    const error = new Error("User not found");
    res.status(404).json({ message: error.message });
  }

  res.status(200).json({
    message: "Login Success",
    data: user,
  });
};

export { register, login };
