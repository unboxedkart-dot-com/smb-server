import mongoose from 'mongoose';

export const FaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

export interface Faq {
  question: string;
  answer: string;
}
