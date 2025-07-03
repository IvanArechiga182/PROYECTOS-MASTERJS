import { Schema, model } from "mongoose";

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});

const NewUser = model("UsersContactInfo", UsersSchema);
export default NewUser;
