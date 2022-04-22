import mongoose from 'mongoose';

export const ItemPurchasedUsersSchema = new mongoose.Schema({
  productId: { type: String, required: true, select: false },
  users: [
    {
      userId: { type: String, required: true },
      userName: { type: String, required: true },
      timestamp: { type: Date, default: Date.now() },
      phoneNumber: { type: Number },
      emailId: { type: String },
    },
  ],
  userIds: { type: Array, default: [] },
});

export interface ItemPurchasedUser {
  productId: string;
  users: [
    {
      userId: String;
      userName: String;
      timestamp: Date;
      phoneNumber: number;
      emailId: string;
    },
  ];
  userIds: [];
}
