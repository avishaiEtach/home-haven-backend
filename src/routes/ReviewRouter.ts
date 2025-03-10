import express from "express";
import ReviewController from "../controllers/ReviewController";
const router = express.Router();

router.get(
  "/getReviewsByProductId/:id",
  ReviewController.getReviewsByProductId
);

const ReviewRouter = router;

export default ReviewRouter;
