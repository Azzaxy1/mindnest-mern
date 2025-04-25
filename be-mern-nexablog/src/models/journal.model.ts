import mongoose, { mongo } from "mongoose";
import { IJournal } from "../types/journal";

const { Schema } = mongoose;

const journalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Journal = mongoose.model<IJournal>("journalPost", journalSchema);
