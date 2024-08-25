import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfCreation: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  letters: {
    type: Map,
  },
  returnedLetters: {
    type: Map
  },
  settings: {
    type: Object,
  }
});

const User = models?.User || model("User", UserSchema);

export default User;
