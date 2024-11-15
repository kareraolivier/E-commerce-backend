import { Request, Response, NextFunction } from "express";
import { reviewService } from "../../services/review/review.service";

export const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await reviewService.getAllReviewes();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const getReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const review = await reviewService.getReviewById(id);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

export const getReviewsByProductId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const reviews = await reviewService.getReviewByProductId(id);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewData = req.body;
    const review = await reviewService.createReview(reviewData);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const reviewData = req.body;
    const updatedReview = await reviewService.updateReview(id, reviewData);
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await reviewService.deleteReview(id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};
