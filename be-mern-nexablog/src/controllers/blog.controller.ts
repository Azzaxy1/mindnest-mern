import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { Blog } from "../models/blog.model";
import { CustomError } from "../types/customError";

const createBlog = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err: CustomError = new Error("Input tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err: CustomError = new Error("Image harus diupload");
    err.errorStatus = 422;
    throw err;
  }

  const { title, body } = req.body;
  const image = req.file.path;

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

const getAllBlogs = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getBlogs = await Blog.find();

    res.status(200).json({
      message: "Get All Blog Posts Success",
      data: getBlogs,
    });
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
  const blogId = req.params.id;

  try {
    const getBlog = await Blog.findById(blogId);

    if (!getBlog) {
      const err: CustomError = new Error("Blog Post tidak ditemukan");
      err.errorStatus = 404;
      throw err;
    }

    res.status(200).json({
      message: "Get Blog Post Success",
      data: getBlog,
    });
  } catch (err) {
    next(err);
  }
};

export { createBlog, getAllBlogs, getBlogById };
