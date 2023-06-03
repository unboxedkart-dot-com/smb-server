import mongoose from 'mongoose';

export const CartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true, select: false },
  productId: { type: String, required: true },
  // timestamp: { type: Date, required: true, default: Date.now() },
  timestamp: { type: String, required: true, default: Date.now().toString() },
  productCount: { type: Number, required: true, default: 1 },
});

export interface CartItem {
  userId: string;
  productId: string;
  timestamp: Date;
  productCount: number;
}
