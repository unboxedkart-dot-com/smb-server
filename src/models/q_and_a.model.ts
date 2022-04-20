import mongoose from 'mongoose';
import { Answer, AnswerSchema } from './answer.model';

export const QuestionAndAnswerSchema = new mongoose.Schema({
  userId: { type: String, required: true, select: false },
  userName: { type: String, required: true },
  userRole: { type: String, required: true },
  productId: { type: String, required: true },
  //   questionId: { type: String, required: true,  },
  productDetails: {
    id: { type: String, required: true },
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    color: { type: String, required: true },
    condition: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
  },
  questionDetails: {
    questionId: { type: String, required: true },
    isApproved: { type: Boolean, required: true, default: false },
    question: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now() },
  },
  answers: [
    {
      type: AnswerSchema,
      required: false,
    },
  ],
});

export interface QuestionAndAnswer {
  userId: string;
  userName: string;
  userRole: string;
  productId: string;
  questionDetails: {
    questionId: string;
    isApproved: boolean;
    question: string;
    timestamp: Date;
  };
  productDetails: {
    id: string;
    imageUrl: string;
    title: string;
    color: string;
    condition: string;
    brand: string;
    category: string;
  };
  answers: Answer[];
}
