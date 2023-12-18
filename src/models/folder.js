import mongoose, { Schema } from "mongoose";
const folderSchema = new Schema({
  name: String,
  type: String,
  children: Array,
  uuid: String,
});
export const Folder =
  mongoose.models.Folder || mongoose.model("Folder", folderSchema);
