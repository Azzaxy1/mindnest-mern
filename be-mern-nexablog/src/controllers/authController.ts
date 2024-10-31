import { Request, Response } from "express";

const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const result = {
    message: "Register Success",
    data: {
      uid: 1,
      name,
      email,
      password,
    },
  };

  res.status(201).json(result);
};

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = {
    message: "Login Success",
    data: {
      uid: 1,
      email,
      password,
    },
  };

  res.status(200).json(result);
};

export { register, login };
