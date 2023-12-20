import mongoose, { Schema } from "mongoose";
const FileContentSchema = new Schema({
  data: String,
   uuid: String,
});
export const FileContent =
  mongoose.models.FileContent ||
  mongoose.model("FileContent", FileContentSchema);
