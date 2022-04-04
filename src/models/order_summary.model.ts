import mongoose from 'mongoose';

export const OrderSummarySchema = new mongoose.Schema({
  orderItems: [
    {
      productId: { type: String, required: true },
      productCount: { type: Number, required: true },
    },
  ],
  timestamp: { type: String, required: true, default: Date.now() },
  userId: { type: String, required: true },
  itemsCount: { type: Number, required: true },
});

export interface OrderSummary {
  userId: string;
  timestamp: Date;
  orderItems: [
    {
      productId: string;
      productCount: number;
    },
  ];
}
