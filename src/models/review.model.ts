import mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
  userId: { type: String, required: true, select: false },
  userName: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewTitle: { type: String, required: false },
  reviewContent: { type: String, required: false },
  productId: { type: String, required: true },
  productCode: { type: String, required: true },
  productTitle: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isApproved: { type: Boolean, required: false, default: false, select: false },
  timestamp: { type: Date, required: true, default: Date.now() },
});

export interface Review {
  userId: string;
  userName: string;
  rating: number;
  reviewTitle: string;
  reviewContent: string;
  productId: string;
  productCode: string;
  productTitle: string;
  imageUrl: string;
  isApproved: string;
  timestamp: Date;
}
