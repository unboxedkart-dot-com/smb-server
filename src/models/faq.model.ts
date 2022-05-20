import mongoose from 'mongoose';
import { FavoriteSchema } from './favorite.model';

export const FaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

export interface Faq {
  question: string;
  answer: string;
}
