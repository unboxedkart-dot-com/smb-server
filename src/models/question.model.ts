import mongoose from 'mongoose';
import { Answer, AnswerSchema } from './answer.model';

export const QuestionSchema = new mongoose.Schema({
  userId: { type: String, required: true, select: false },
  userName: { type: String, required: true },
  userRole: { type: String, required: true },
  productId: { type: String, required: true },
  isApproved: { type: Boolean, required: true, default: false },
  question: { type: String, required: true },
  productDetails: {
    id: { type: String, required: true },
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    color: { type: String, required: true },
    condition: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
  },
  timestamp: { type: Date, required: true, default: Date.now() },
});

export interface Question {
  userId: string;
  userName: string;
  userRole: string;
  productId: string;
  isApproved: boolean;
  question: string;
  timestamp: Date;
  productDetails: {
    id: string;
    imageUrl: string;
    title: string;
    color: string;
    condition: string;
    brand: string;
    category: string;
  };
}
