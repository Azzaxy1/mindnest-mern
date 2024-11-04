import path from "path";
import fs from "fs";

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
    throw err;
  }

  if (!req.file) {
    const err: CustomError = new Error("Image harus diupload");
    err.errorStatus = 422;
    throw err;
  }

  const { title, body } = req?.body;
  const image = req?.file?.path;

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

const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentPage = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 5;

    let totalItems = await Blog.countDocuments();

    const getBlogs = await Blog.find()
      .lean()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Get All Blog Posts Success",
      data: getBlogs,
      total_data: totalItems,
      per_page: perPage,
      current_page: currentPage,
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

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err: CustomError = new Error("Input tidak sesuai");
    err.errorStatus = 400;
    err.data = error.array();
    throw err;
  }

  try {
    const blogId = req.params.id;

    const { title, body } = req?.body;
    const image = req?.file?.path;

    const getBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        body,
        image,
        author: {
          uid: 1,
          name: "Abdurrohman Azis",
        },
      },
      { new: true }
    );

    if (!getBlog) {
      const err: CustomError = new Error("Blog Post tidak ditemukan");
      err.errorStatus = 404;
      throw err;
    }

    res.status(200).json({
      message: "Update Blog Post Success",
      data: getBlog,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogId = req.params.id;

    const getBlog = await Blog.findByIdAndDelete(blogId);

    if (!getBlog) {
      const err: CustomError = new Error("Blog Post tidak ditemukan");
      err.errorStatus = 404;
      throw err;
    }

    removeImage(getBlog.image);

    res.status(200).json({
      message: "Delete Blog Post Success",
      data: getBlog,
    });
  } catch (error) {
    next(error);
  }
};

const removeImage = (filePath: string) => {
  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
