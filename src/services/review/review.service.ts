import db from "../../../models";
import { Review } from "../../../models/review";
import { BadRequestError, NotFoundError } from "../../errors/AppErrors";
import { ReviewRepository } from "../../repository/review/review.repository";
import { productService } from "../product/product.service";
import { userService } from "../users/user.service";

const reviewRepository = new ReviewRepository(db.sequelize);

class ReviewService {
  private reviewRepository: ReviewRepository;
  constructor(reviewRepository: ReviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async getAllReviewes(): Promise<Review[]> {
    return await this.reviewRepository.fetchAllReviews();
  }

  async getReviewById(id: string): Promise<Review | null> {
    const review = await this.reviewRepository.fetchReviewById(id);
    if (!review) {
      throw new NotFoundError("Review not found");
    }
    return review;
  }

  async getReviewByProductId(userId: string): Promise<Review[]> {
    const review = await this.reviewRepository.fetchReviewsByProductId(userId);
    if (!review) {
      throw new NotFoundError("Review not found");
    }
    return review;
  }

  async createReview(reviewData: Review): Promise<Review> {
    await userService.getUserById(reviewData.userId);
    await productService.getProductById(reviewData.productId);
    return await this.reviewRepository.createReview(reviewData);
  }

  async updateReview(
    id: string,
    reviewData: Partial<Review>
  ): Promise<Partial<Review>> {
    await this.getReviewById(id);
    const review = await this.reviewRepository.updateReview(id, reviewData);
    return review as Review;
  }

  async deleteReview(id: string): Promise<void> {
    await this.getReviewById(id);
    return await this.reviewRepository.deleteReview(id);
  }
}

export const reviewService = new ReviewService(reviewRepository);
