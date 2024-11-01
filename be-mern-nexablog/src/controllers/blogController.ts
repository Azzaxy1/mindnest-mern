import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../types";
import { Blog } from "../models/blog.model";

const createBlog = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err: CustomError = new Error("Input tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const { title, image, body } = req.body;

  const newBlog = new Blog({
    title,
    image,
    body,
    author: {
      uid: 1,
      name: "Abdurrohman Azis",
    },
  });

  const savedBlog = await newBlog.save();

  res.status(201).json({
    message: "Create Blog Post Success",
    data: savedBlog,
  });
};

const getAllBlogs = async (_req: Request, res: Response) => {
  // const result = {
  //   message: "Blog berhasil diambil",
  //   data: [
  //     {
  //       id: 1,
  //       title: "Blog Pertama",
  //       author: "John Doe",
  //       body: "Lorem ipsum dolor sit amet",
  //       date: "2021-08-01",
  //     },
  //     {
  //       id: 2,
  //       title: "Blog Kedua",
  //       author: "Jane Doe",
  //       body: "Lorem ipsum dolor sit amet",
  //       date: "2021-08-02",
  //     },
  //     {
  //       id: 3,
  //       title: "Blog Ketiga",
  //       author: "James Doe",
  //       body: "Lorem ipsum dolor sit amet",
  //       date: "2021-08-02",
  //     },
  //   ],
  // };

  const getBlogs = await Blog.find();
  res.status(200).json(getBlogs);
};

export { createBlog, getAllBlogs };
