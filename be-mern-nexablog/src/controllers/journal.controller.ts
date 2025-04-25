import path from "path";
import fs from "fs";

import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { Journal } from "../models/journal.model";
import { CustomError } from "../types/customError";

const createJournal = async (req: Request, res: Response) => {
  try {
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

    const { title, body } = req?.body;
    const image = req?.file?.path;

    const newJournal = new Journal({
      title,
      image,
      body,
      author: req.user._id,
    });

    const savedJournal = await newJournal.save();

    res.status(201).json({
      message: "Create journal Post Success",
      data: savedJournal,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getAllJournals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentPage = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 5;

    let totalItems = await Journal.countDocuments({ author: req.user._id });

    const getJournals = await Journal.find({ author: req.user._id })
      .lean()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Get All journal Posts Success",
      data: getJournals,
      total_data: totalItems,
      per_page: perPage,
      current_page: currentPage,
    });
  } catch (error) {
    next(error);
  }
};

const getJournalById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const journalId = req.params.id;

  try {
    const getJournal = await Journal.findOne({
      _id: journalId,
      author: req.user._id,
    });

    if (!getJournal) {
      const err: CustomError = new Error("journal Post tidak ditemukan");
      err.errorStatus = 404;
      throw err;
    }

    res.status(200).json({
      message: "Get journal Post Success",
      data: getJournal,
    });
  } catch (err) {
    next(err);
  }
};

const updateJournal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err: CustomError = new Error("Input tidak sesuai");
    err.errorStatus = 400;
    err.data = error.array();
    throw err;
  }

  try {
    const journalId = req.params.id;

    const { title, body } = req?.body;
    const image = req?.file?.path;

    const getJournal = await Journal.findByIdAndUpdate(
      journalId,
      {
        title,
        body,
        image,
        author: req.user._id,
      },
      { new: true }
    );

    if (!getJournal) {
      const err: CustomError = new Error("journal Post tidak ditemukan");
      err.errorStatus = 404;
      throw err;
    }

    res.status(200).json({
      message: "Update journal Post Success",
      data: getJournal,
    });
  } catch (err) {
    next(err);
  }
};

const deleteJournal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const journalId = req.params.id;

    const getJournal = await Journal.findByIdAndDelete(journalId);

    if (!getJournal) {
      const err: CustomError = new Error("journal Post tidak ditemukan");
      err.errorStatus = 404;
      throw err;
    }

    removeImage(getJournal.image);

    res.status(200).json({
      message: "Delete journal Post Success",
      data: getJournal,
    });
  } catch (error) {
    next(error);
  }
};

const removeImage = (filePath: string) => {
  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

export {
  createJournal,
  getAllJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
};
