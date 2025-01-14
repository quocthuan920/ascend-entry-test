import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "users";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
    collection: COLLECTION_NAME,
  }
);

export default model(DOCUMENT_NAME, userSchema);
