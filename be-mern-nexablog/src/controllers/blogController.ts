import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../types";

const createBlog = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err: CustomError = new Error("Input tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const { title, image, author, body, date } = req.body;
  const result = {
    message: "Create Blog Post Success",
    data: {
      post_id: 1,
      title,
      image,
      body,
      date,
      author: {
        uid: 1,
        name: author,
      },
    },
  };

  res.status(201).json(result);
};

const getAllBlogs = (_req: Request, res: Response) => {
  const result = {
    message: "Blog berhasil diambil",
    data: [
      {
        id: 1,
        title: "Blog Pertama",
        author: "John Doe",
        body: "Lorem ipsum dolor sit amet",
        date: "2021-08-01",
      },
      {
        id: 2,
        title: "Blog Kedua",
        author: "Jane Doe",
        body: "Lorem ipsum dolor sit amet",
        date: "2021-08-02",
      },
      {
        id: 3,
        title: "Blog Ketiga",
        author: "James Doe",
        body: "Lorem ipsum dolor sit amet",
        date: "2021-08-02",
      },
    ],
  };
  res.status(200).json(result);
};

export { createBlog, getAllBlogs };
