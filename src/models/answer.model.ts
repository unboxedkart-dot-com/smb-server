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
  answerDetails: {
    isApproved: { type: Boolean, required: true, default: false },
    productId: { type: String, required: false },
    answer: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now() },
  },
});

export interface Answer {
  userId: string;
  userName: string;
  userRole: string;
  questionId: string;
  answerDetails: {
    isApproved: boolean;
    productId: string;
    answer: string;
    timestamp: Date;
  };
}
