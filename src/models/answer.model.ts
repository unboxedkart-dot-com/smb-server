import mongoose from 'mongoose';

export enum UserRoles {
  USER = 'user',
  SELLER = 'registered seller',
  ADMIN = 'administrator',
}

export const AnswerSchema = new mongoose.Schema({
  userId: { type: String, required: true, select: false },
  userName: { type: String, required: true },
  userRole: { type: String, required: true },
  questionId: { type: String, required: true },
  isApproved: { type: Boolean, required: true, default: false },
  productId: { type: String, required: true },
  answer: { type: String, required: true },
  questionDetails: {
    questionTitle: { type: String, required: true },
    productTitle: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now() },
  },
  timestamp: { type: Date, required: true, default: Date.now() },
});

export interface Answer {
  userId: string;
  userName: string;
  userRole: string;
  questionId: string;
  isApproved: boolean;
  answer: string;
  questionDetails: {
    questionTitle: string;
    productTitle: string;
    timestamp: Date;
  };
  timestamp: Date;
}
