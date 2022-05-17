import mongoose from 'mongoose';

export const SavedToLaterSchema = new mongoose.Schema({
  userId: { type: String, required: true, select: false },
  productId: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now() },
  productCount: { type: Number, required: true, default: 1 },
});

export interface SavedToLater {
  userId: string;
  productId: string;
  timestamp: Date;
  productCount: number;
}
