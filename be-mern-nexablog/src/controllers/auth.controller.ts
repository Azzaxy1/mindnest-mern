import { Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../types/customError";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { google } from "googleapis";
import { authorizationUrl, oauth2Client } from "../middleware/oauth.middleware";

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

const googleOauth = (req: Request, res: Response) => {
  res.redirect(authorizationUrl);
};

const googleOauthCallback: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { code } = req.query;

    if (!code) {
      res.status(400).json({ message: "Authorization code is missing" });
      return;
    }

    let { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email) {
      res.json({
        data: data,
      });
      return;
    }

    let user = await User.findOne({ email: data.email });

    if (!user) {
      user = new User({
        name: data.name,
        email: data.email,
      });
      await user.save();
    }

    const token = await user.generateAuthToken();

    // return res.redirect(`http//localhost:5173/google?token=${token}`);

    res.status(200).json({
      data: user,
      token,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    return;
  }
};

const getMe = (req: Request, res: Response) => {
  const user = req.user;

  res.status(200).json({
    data: user,
  });
};

export { register, login, getMe, googleOauth, googleOauthCallback };
