import express from "express";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { UserModel } from "../db/models/user";
import { utilsFunctions } from "../utils/utilsFunctions";
import jwt from "jsonwebtoken";
import { ProductModel } from "../db/models/product";
import { ReviewModel } from "../db/models/review";

class ReviewController {
  getReviewsByProductId = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const { id } = req.params;
      const reviews = await ReviewModel.find({ productId: id });
      return res.status(200).json(reviews);
    } catch (err: any) {
      return res.status(401).send(err.message);
    }
  };
}

export default new ReviewController();
