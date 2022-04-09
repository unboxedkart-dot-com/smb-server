import mongoose from 'mongoose';

export const ReviewsDataSchema = new mongoose.Schema({
  productId: { type: String, required: false },
  oneStarCount: { type: Number, required: false },
  twoStarCount: { type: Number, required: false },
  threeStarCount: { type: Number, required: false },
  fourStarCount: { type: Number, required: false },
  fiveStarCount: { type: Number, required: false },
  averageRating: { type: Number, required: false },
  totalReviewsCount: { type: Number, required: false },
});

export interface ReviewsData {
  productId: string;
  averageRating: number;
  fiveStarCount: number;
  fourStarCount: number;
  threeStarCount: number;
  twoStarCount: number;
  OneStarCount: number;
  totalReviewsCount: number;
}
