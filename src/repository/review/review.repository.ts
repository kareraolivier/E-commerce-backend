import { Review } from "../../../models/review";
import { Sequelize, QueryTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { updateRecord } from "../../helpers/update.query";

export class ReviewRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async fetchAllReviews(): Promise<Review[]> {
    const reviews = await this.sequelize.query(
      'SELECT * FROM "Reviews" ORDER BY id desc',
      {
        type: QueryTypes.SELECT,
      }
    );
    return reviews as Review[];
  }

  async fetchReviewById(id: string): Promise<Review | null> {
    const review = await this.sequelize.query(
      'SELECT * FROM "Reviews" WHERE "id" = :id',
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );
    return (review[0] as Review) || null;
  }

  async fetchReviewsByProductId(productId: string): Promise<Review[]> {
    const reviews = await this.sequelize.query(
      'SELECT * FROM "Reviews" WHERE "productId" = :productId',
      {
        replacements: { productId },
        type: QueryTypes.SELECT,
      }
    );
    return reviews as Review[];
  }

  async createReview(reviewData: Partial<Review>): Promise<Review> {
    const review = await this.sequelize.query(
      'INSERT INTO "Reviews" ("id", "productId", "userId", "rating", "comment", "isDeleted") VALUES (:id, :productId, :userId, :rating, :comment, :isDeleted) RETURNING *',
      {
        replacements: {
          id: uuidv4(),
          ...reviewData,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        type: QueryTypes.INSERT,
      }
    );
    return review as unknown as Review;
  }

  async updateReview(id: string, reviewData: Partial<Review>) {
    return await updateRecord<Review>(
      this.sequelize,
      "Reviews",
      id,
      reviewData
    );
  }

  async deleteReview(id: string): Promise<void> {
    await this.sequelize.query('DELETE FROM "Reviews" WHERE "id" = :id', {
      replacements: { id },
      type: QueryTypes.DELETE,
    });
  }
}
