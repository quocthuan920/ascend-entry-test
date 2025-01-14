import { Schema, model } from "mongoose";
import RatingModel from "./rating.model.js";

const DOCUMENT_NAME = "Movie";
const COLLECTION_NAME = "movies";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

movieSchema.pre("findOneAndDelete", async function (next) {
  const movieId = this.getQuery()["_id"];
  await RatingModel.deleteMany({ movie: movieId });
  next();
});

export default model(DOCUMENT_NAME, movieSchema);
