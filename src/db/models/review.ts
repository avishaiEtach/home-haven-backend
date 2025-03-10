import mongoose from "mongoose";
import { Review } from "../../types/globalTypes";

const ReviewSchema = new mongoose.Schema<Review>(
  {
    user: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ReviewModel = mongoose.model("Review", ReviewSchema);
