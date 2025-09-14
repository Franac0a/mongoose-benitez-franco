import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
  },
  { versionKey: false }
);

export const CategoryModel = model("Category", categorySchema);
