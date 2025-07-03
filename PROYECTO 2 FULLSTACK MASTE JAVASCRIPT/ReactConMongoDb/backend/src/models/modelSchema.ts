import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  year: Number,
  langs: String,
  imageOriginal: String,
  fileName: String,
});

const NewProject = model("NewProject", ProjectSchema);
export default NewProject;
