import mongoose from 'mongoose';

export const FavoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true, select: false },
  productId: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now() },
});

export interface Favorite {
  userId: string;
  productId: string;
  timestamp: Date;
}
