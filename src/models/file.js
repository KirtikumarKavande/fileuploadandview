import mongoose, { Schema } from "mongoose";
const FileContentSchema = new Schema({
  fileContent: String,
   uuid: String,
});
export const FileContent =
  mongoose.models.FileContent ||
  mongoose.model("FileContent", FileContentSchema);
